import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const linkFile = path.join(__dirname, 'static/link.json');

const linksData = JSON.parse(fs.readFileSync(linkFile, 'utf-8'));

async function checkLink(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(url, {
            method: 'HEAD',
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        clearTimeout(timeoutId);

        if (response.ok) {
            return { status: 'OK', code: response.status };
        } else {
            // Try GET if HEAD fails (some servers block HEAD)
            const controllerGet = new AbortController();
            const timeoutIdGet = setTimeout(() => controllerGet.abort(), 10000);
            const responseGet = await fetch(url, {
                method: 'GET',
                signal: controllerGet.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            clearTimeout(timeoutIdGet);
            if (responseGet.ok) {
                return { status: 'OK', code: responseGet.status };
            }
            return { status: 'FAIL', code: responseGet.status };
        }
    } catch (error) {
        return { status: 'ERROR', message: error.message };
    }
}

async function main() {
    console.log('Starting link check...');
    const results = [];

    for (const category of linksData) {
        console.log(`\nChecking category: ${category.class_name || category.class_desc || 'Unnamed'}`);
        if (!category.link_list) continue;

        for (const item of category.link_list) {
            process.stdout.write(`Checking ${item.name} (${item.link}) ... `);
            const result = await checkLink(item.link);
            console.log(result.status === 'OK' ? '✅' : `❌ (${result.code || result.message})`);
            results.push({ ...item, status: result });
        }
    }

    console.log('\n--- Summary ---');
    const failures = results.filter(r => r.status.status !== 'OK');
    if (failures.length === 0) {
        console.log('All links are accessible!');
    } else {
        console.log(`${failures.length} links failed:`);
        failures.forEach(f => {
            console.log(`- ${f.name} (${f.link}): ${f.status.code || f.status.message}`);
        });
    }
}

main();

const fs = require('fs');
const path = require('path');
const pinyin = require('pinyin');

const filePath = path.resolve(__dirname, 'public', 'link.json');
const raw = fs.readFileSync(filePath, 'utf8');
let data = JSON.parse(raw);

function toSortKey(name) {
  if (!name) return '';
  // Convert the full phrase to pinyin in context, this helps disambiguate polyphones
  try {
    const pyArr = pinyin.pinyin(name, { style: pinyin.STYLE_NORMAL, heteronym: false });
    const flattened = pyArr.flat().join('');
    return flattened.toLowerCase().replace(/\s+/g, ' ').trim();
  } catch (err) {
    // Fallback to a per-char fallback
    const chars = Array.from(name);
    const parts = chars.map(ch => {
      if (/\p{Script=Han}/u.test(ch)) {
        const py = pinyin.pinyin(ch, { style: pinyin.STYLE_NORMAL, heteronym: false });
        return py && py[0] && py[0][0] ? py[0][0] : ch;
      }
      return ch;
    });
    return parts.join('').toLowerCase();
  }
}

function compareName(a, b) {
  if (!a || !a.name) return -1;
  if (!b || !b.name) return 1;
  const ka = toSortKey(a.name);
  const kb = toSortKey(b.name);
  if (ka === kb) return a.name.localeCompare(b.name, ['zh-Hans-CN', 'en'], { sensitivity: 'base' });
  return ka.localeCompare(kb, 'en', { sensitivity: 'base' });
}

if (Array.isArray(data)) {
  data.forEach(item => {
    if (Array.isArray(item.link_list)) item.link_list.sort(compareName);
  });
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Sorted link.json successfully (pinyin-aware, phrase context).');

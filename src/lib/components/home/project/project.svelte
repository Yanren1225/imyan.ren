<script lang="ts">
  import './project.css'
  import HoverCard from '$lib/components/hover-card/hover-card.svelte'
  import ImageWithPlaceholder from '$lib/components/image-with-placeholder/image-with-placeholder.svelte'
  import ScrollReveal from '$lib/components/scroll-reveal/scroll-reveal.svelte'
  import { t } from '$lib/i18n'
  import FlixIcon from '@/assets/flix.png'

  interface ProjectConfig {
    title: string
    icon: string
    link: string
  }

  const projects: ProjectConfig[] = [
    {
      title: 'Yanren API',
      icon: 'https://api.dicebear.com/9.x/icons/svg?seed=Brian&backgroundType=gradientLinear',
      link: 'https://doc.api.imyan.ren/',
    },
    {
      title: 'Flix',
      icon: FlixIcon,
      link: 'https://flix.center/',
    },
    {
      title: 'Kirby Assistant',
      icon: 'https://raw.githubusercontent.com/KirbyAssistant/Kirby-Assistant/master/logo.png',
      link: 'https://kirby.cool/',
    },
    {
      title: 'Snipdroid',
      icon: 'https://avatars.githubusercontent.com/u/127229863',
      link: 'https://github.com/Snipdroid/',
    },
  ]
</script>

<div id="project">
  <span class="title">{t('project')}</span>
  <div class="projects">
    {#each projects as item, index (item.title)}
      <ScrollReveal delay={Math.min(index * 50, 150)}>
        <HoverCard
          as="a"
          intensity={3}
          class="project-item"
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageWithPlaceholder
            src={item.icon}
            alt={item.title}
            class="icon"
            imgClass="project-icon"
          />
          <span class="title">{item.title}</span>
          <span class="arrow i-material-symbols-arrow-outward-rounded"></span>
        </HoverCard>
      </ScrollReveal>
    {/each}
  </div>
</div>

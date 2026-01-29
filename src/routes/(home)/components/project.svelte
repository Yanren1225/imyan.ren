<script lang="ts">
  import HoverCard from '$lib/components/hover-card/hover-card.svelte'
  import ImageWithPlaceholder from '$lib/components/image-with-placeholder/image-with-placeholder.svelte'
  import ScrollReveal from '$lib/components/scroll-reveal/scroll-reveal.svelte'
  import { i18n } from '$lib/i18n'
  import FlixIcon from '$assets/flix.png'

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
  <span class="title">{i18n.t.project}</span>
  <div class="projects">
    {#each projects as item, index (item.title)}
      <ScrollReveal delay={Math.min(index * 50, 150)}>
        <HoverCard
          as="a"
          intensity={3}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          class="project-item"
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

<style>
  #project {
    margin-top: 3rem;
  }

  #project .title {
    font-size: 3rem;
    font-weight: bold;
  }

  #project .projects {
    margin: 1rem 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    counter-reset: project-counter;
  }

  @media (max-width: 600px) {
    #project .projects {
      grid-template-columns: 1fr;
    }
  }

  #project .projects :global(.project-item) {
    counter-increment: project-counter;
    align-items: center;
    padding: 24px;
    gap: 32px;

    /* :global(.project-icon) {
      width: 100%;
      height: 100%;
      object-fit: contain;
    } */

    .title {
      font-size: 20px;
      font-weight: bold;
      color: var(--c-text);
      transition: all 0.3s ease;
    }

    .arrow {
      color: var(--c-text);
      position: absolute;
      top: 20px;
      right: 20px;
      opacity: 0.3;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* ID number deco */
    &::after {
      content: 'PROJ_ID_00' counter(project-counter);
      position: absolute;
      bottom: 5px;
      right: 10px;
      font-size: 10px;
      opacity: 0.1;
      pointer-events: none;
    }

    @media (max-width: 600px) {
      gap: 20px;
    }

    @media (hover: hover) {
      &:hover {
        :global(.img-placeholder-container) {
          transform: scale(1.1);
        }

        .arrow {
          transform: translate(6px, -6px);
          opacity: 1;
          color: var(--c-neon);
        }

        .title {
          color: var(--c-neon);
          text-shadow: 0 0 5px var(--c-neon);
        }
      }
    }
  }
</style>

import './project.css'

import { Component, For, Index } from 'solid-js'

import { HoverCard } from '@/components/hover-card/hover-card'
import { ScrollReveal } from '@/components/scroll-reveal'
import { t } from '@/i18n'

import FlixIcon from '@/assets/flix.png'

import { ImageWithPlaceholder } from '@/components/image-with-placeholder/image-with-placeholder'

interface ProjectConfig {
  title: string
  icon: string
  link: string
}

export const Project: Component = () => {
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

  return (
    <>
      <div id="project">
        <span class="title">{t('project')}</span>
        <div class="projects">
          <Index each={projects}>
            {(item, index) => (
              <ScrollReveal delay={Math.min(index * 50, 150)}>
                <ProjectItem {...item()} />
              </ScrollReveal>
            )}
          </Index>
        </div>
      </div>
    </>
  )
}

const ProjectItem: Component<ProjectConfig> = (props) => {
  return (
    <HoverCard
      as="a"
      intensity={3}
      class="project-item"
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ImageWithPlaceholder
        src={props.icon}
        alt={props.title}
        class="icon"
        imgClass="project-icon"
      />
      <span class="title">{props.title}</span>
      <span class="arrow i-material-symbols-arrow-outward-rounded" />
    </HoverCard>
  )
}

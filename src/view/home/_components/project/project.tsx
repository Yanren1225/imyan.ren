import './project.css'

import { Component, For, Index } from 'solid-js'

import { MouseFollow } from '@/components/mouse-follow'
import { MouseLight } from '@/components/mouse-light'
import { ScrollReveal } from '@/components/scroll-reveal'
import { t } from '@/i18n'

import FlixIcon from '@/assets/flix.png'

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
        <span class="title font-mono">{t('project')}</span>
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
    <MouseFollow intensity={3}>
      <MouseLight
        as="a"
        class="project-item"
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          class="icon"
          src={props.icon}
          alt={props.title}
          loading="lazy"
          decoding="async"
        />
        <span class="title">{props.title}</span>
        <span class="arrow i-material-symbols-arrow-outward-rounded" />
      </MouseLight>
    </MouseFollow>
  )
}

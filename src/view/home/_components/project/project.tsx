import './project.less'

import { Component, For } from 'solid-js'

import DenoIcon from '@/assets/deno.svg'

const Project: Component = () => {
  const projects: ProjectItemProps[] = [
    {
      title: 'Yanren Deno API',
      icon: DenoIcon,
      link: 'https://doc.deno-api.imyan.ren/',
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
        <span class="title">Project</span>
        <div class="projects">
          <For each={projects}>{(item) => <ProjectItem {...item} />}</For>
        </div>
      </div>
    </>
  )
}

interface ProjectItemProps {
  title: string
  icon: string
  link: string
}

const ProjectItem: Component<ProjectItemProps> = (props) => {
  return (
    <>
      <a class="project-item" href={props.link} target="_blank">
        <img class="icon" src={props.icon} />
        <span class="title">{props.title}</span>
        <span class="arrow i-material-symbols-arrow-outward-rounded" />
      </a>
    </>
  )
}

export { Project }

import { PiArrowUpRightBold } from 'react-icons/pi';

const repositoryGroups = [
  {
    title: '核心平台与交付',
    label: 'CORE & DELIVERY',
    repositories: [
      ['webots', '机器人、车辆与机械系统的三维仿真平台'],
      ['robot-designer', '面向 Webots 的网页机器人设计工具'],
      ['webots-cloud', 'Webots 在线仿真与云端体验'],
      ['webots-libcontroller', '跨平台预编译控制器库'],
      ['webots-snap', 'Webots Linux Snap 构建配置'],
      ['webots-docker', 'GPU 加速 Webots Docker 镜像'],
      ['blender-webots-exporter', '从 Blender 导出 Webots 文件'],
    ],
  },
  {
    title: '机器人与框架集成',
    label: 'ROBOTICS INTEGRATION',
    repositories: [
      ['webots_ros2', 'Webots ROS 2 软件包'],
      ['webots_ros', 'Webots ROS 软件包'],
      ['epuck_ros2', 'e-puck 机器人 ROS 2 节点与仿真模型'],
      ['naoqisim', '面向 NAO 机器人的 NAOqi 仿真控制器'],
      ['urdf2webots', '将 URDF 转换为 Webots PROTO'],
      ['pyikfast', 'IKFast Python 绑定与逆运动学生成工具'],
      ['HsWebots', 'Webots 的 Haskell 语言绑定'],
    ],
  },
  {
    title: '项目、文档与自动化',
    label: 'ECOSYSTEM',
    repositories: [
      ['webots-projects', 'Cyberbotics 官方 Webots 扩展项目'],
      ['community-projects', '社区贡献的 PROTO、控制器与仿真世界'],
      ['awesome-webots', 'Webots 生态资源精选列表'],
      ['webots-animation-action', '发布机器人仿真动画的 GitHub Action'],
      ['ros2_documentation', 'ROS 2 文档仓库'],
      ['AROSYS', 'Webots 与 SmartMDSD Toolchain 集成'],
    ],
  },
  {
    title: '发布与竞赛模板',
    label: 'RELEASE & TEMPLATES',
    repositories: [
      ['webots_ros-release', 'Webots ROS 发布仓库'],
      ['webots_ros2-release', 'Webots ROS 2 发布仓库'],
      ['webots-cloud-simulation-template', 'webots.cloud 仿真模板'],
      ['webots-competition-organizer-template', 'Webots 竞赛组织者模板'],
      ['webots-competition-competitor-template', 'Webots 竞赛选手模板'],
      ['competition-template', '在线机器人竞赛通用模板'],
    ],
  },
] as const;

const repositoryCount = repositoryGroups.reduce((total, group) => total + group.repositories.length, 0);
const repositoryRowCount = Math.max(...repositoryGroups.map((group) => group.repositories.length));

export default function OpenSourceMemberships() {
  return <section className="membership-panel" data-reveal data-motion>
    <header className="membership-identity">
      <div className="membership-organization"><img src="https://github.com/cyberbotics.png?size=160" alt="" /><div><small>ORGANIZATION MEMBERSHIP</small><h3>Cyberbotics Ltd.</h3><p>Committers Team Member</p></div></div>
      <div className="membership-summary"><strong>{repositoryCount}</strong><div><span>PUBLIC REPOSITORIES</span><p>受 Olivier Michel 邀请加入 Cyberbotics Ltd. 的 Committers 团队。团队围绕 Webots 机器人仿真平台，协同维护核心工具、ROS / ROS 2 集成、云端仿真、控制器与发布基础设施，并持续建设面向开发者的机器人仿真生态。</p></div></div>
      <a href="https://github.com/cyberbotics" target="_blank" rel="noopener noreferrer">查看 GitHub 组织 <PiArrowUpRightBold aria-hidden="true" /></a>
    </header>
    <div className="membership-repository-groups">
      {repositoryGroups.map((group, groupIndex) => {
        const emptySlots = repositoryRowCount - group.repositories.length;
        return <article key={group.label}>
          <header><span>{String(groupIndex + 1).padStart(2, '0')}</span><div><small>{group.label}</small><h4>{group.title}</h4></div></header>
          <div>{group.repositories.map(([name, description]) => <a href={`https://github.com/cyberbotics/${name}`} target="_blank" rel="noopener noreferrer" key={name}><span><strong>{name}</strong></span><p>{description}</p><PiArrowUpRightBold aria-hidden="true" /></a>)}{Array.from({ length: emptySlots }, (_, index) => <div className="membership-repository-placeholder" aria-hidden="true" key={`empty-${index}`} />)}</div>
        </article>;
      })}
    </div>
  </section>;
}

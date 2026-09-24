import { PiArrowUpRightBold } from 'react-icons/pi';

const pkuRepositoryGroups = [
  {
    title: '低比特量化',
    label: 'LLM QUANTIZATION',
    repositories: [
      ['Fairy-plus-minus-i', 'iFairy：面向大语言模型的复数值量化框架'],
      ['Fairy2i-W2', '把预训练实值模型转换为可进行极低比特量化的复数形式'],
      ['ifairy.cpp', 'iFairy 模型转换与跨平台 CPU 推理实现'],
    ],
  },
  {
    title: '智能体与具身系统',
    label: 'AGENTS & ROBOTICS',
    repositories: [
      ['FairyClaw', '面向长时服务端部署的异步 Agent 运行时'],
      ['AgentRob', '连接论坛、LLM Agent 与实体机器人的 MCP 框架'],
      ['ai-code-tips', '沉淀 Codex、Claude Code 等 Agent 工具实践'],
    ],
  },
  {
    title: '评测与安全',
    label: 'EVALUATION & SAFETY',
    repositories: [
      ['Pangu-Bench', '评估少样本示例如何影响 LLM 越狱防御'],
      ['FairyR1-wrapper', '补齐 FairyR1 输出思维链前缀的通用封装'],
    ],
  },
  {
    title: '模型系统研究',
    label: 'MODEL SYSTEMS',
    repositories: [
      ['PredictionMoE', '通过预测专家负载分布稳定 MoE 路由与执行'],
    ],
  },
] as const;

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
const pkuRepositoryCount = pkuRepositoryGroups.reduce((total, group) => total + group.repositories.length, 0);
const pkuRepositoryRowCount = Math.max(...pkuRepositoryGroups.map((group) => group.repositories.length));

export default function OpenSourceMemberships() {
  return <div className="membership-list">
    <section className="membership-panel membership-panel-pku" data-reveal data-motion>
      <header className="membership-identity">
        <div className="membership-organization"><img src="https://github.com/PKU-LLM-DS-LAB.png?size=160" alt="" /><div><small>ORGANIZATION MEMBERSHIP</small><h3>PKU-LLM&amp;DS-LAB</h3><p>Research Lab Member</p></div></div>
        <div className="membership-summary"><strong>{pkuRepositoryCount}</strong><div><span>PUBLIC REPOSITORIES</span><p>北京大学 LLM&amp;DS Lab 由杨仝教授领导，研究方向覆盖大语言模型、数据结构与网络。团队从低比特量化、MoE 负载预测延伸到 Agent 运行时、安全评测与具身智能系统，连接算法研究、系统实现和可复现实验。</p></div></div>
        <a href="https://github.com/PKU-LLM-DS-LAB" target="_blank" rel="noopener noreferrer">查看 GitHub 组织 <PiArrowUpRightBold aria-hidden="true" /></a>
      </header>
      <div className="membership-repository-groups">
        {pkuRepositoryGroups.map((group, groupIndex) => {
          const emptySlots = pkuRepositoryRowCount - group.repositories.length;
          return <article key={group.label}>
            <header><span>{String(groupIndex + 1).padStart(2, '0')}</span><div><small>{group.label}</small><h4>{group.title}</h4></div></header>
            <div>{group.repositories.map(([name, description]) => <a href={`https://github.com/PKU-LLM-DS-LAB/${name}`} target="_blank" rel="noopener noreferrer" key={name}><span><strong>{name}</strong></span><p>{description}</p><PiArrowUpRightBold aria-hidden="true" /></a>)}{Array.from({ length: emptySlots }, (_, index) => <div className="membership-repository-placeholder" aria-hidden="true" key={`empty-${index}`} />)}</div>
          </article>;
        })}
      </div>
    </section>
    <section className="membership-panel" data-reveal data-motion>
    <header className="membership-identity">
      <div className="membership-organization"><img src="https://github.com/cyberbotics.png?size=160" alt="" /><div><small>ORGANIZATION MEMBERSHIP</small><h3>Cyberbotics Ltd.</h3><p>Committers Team Member</p></div></div>
      <div className="membership-summary"><strong>{repositoryCount}</strong><div><span>PUBLIC REPOSITORIES</span><p>团队围绕 Webots 机器人仿真平台，协同维护核心仿真工具、ROS / ROS 2 集成、云端运行环境、机器人控制器与跨平台发布基础设施，并通过项目模板、文档和社区资源持续建设面向开发者的机器人仿真生态。</p></div></div>
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
    </section>
  </div>;
}

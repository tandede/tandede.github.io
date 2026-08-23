import {
  PiArrowDownRightBold,
  PiArrowRightBold,
  PiArrowUpBold,
  PiArrowUpRightBold,
  PiArticle,
  PiBrain,
  PiBroom,
  PiCaretDownBold,
  PiChartLineUp,
  PiCheckCircle,
  PiCpu,
  PiDatabase,
  PiEnvelope,
  PiGlobeHemisphereWest,
  PiShieldCheck,
  PiSmiley,
  PiStack,
} from 'react-icons/pi';
import type { CSSProperties } from 'react';
import { SiGithub, SiGooglescholar, SiLinkedin } from 'react-icons/si';
import NavigationShell from './navigation-shell';
import { openSourceProjects } from './open-source-data';
import OpenSourceGrid from './open-source-grid';
import { featuredProjects } from './project-data';

const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' } as const;

const pipeline = [
  { icon: PiGlobeHemisphereWest, title: 'Web Data', subtitle: '多源网页语料', status: 'INPUT' },
  { icon: PiBroom, title: 'Clean / Dedup', subtitle: '清洗与近重复控制', status: 'PROCESS' },
  { icon: PiCheckCircle, title: 'Quality', subtitle: '质量评估与分层', status: 'SIGNAL' },
  { icon: PiStack, title: 'Data Scaling', subtitle: '持续回流的数据飞轮', status: 'FLYWHEEL' },
  { icon: PiBrain, title: 'Pretrain / Eval', subtitle: '训练反馈与能力验证', status: 'EVIDENCE' },
];

const focusAreas = [
  {
    index: '01', title: 'Pretrain Data Scaling', icon: PiDatabase,
    question: '如何构建大规模、高质量、可追溯的网页预训练数据？',
    method: ['多源数据清洗与归一化', '近重复控制与质量分层', '训练反馈驱动持续回流'],
    evidence: ['40T 可训练 Token 目标', '网页数据质量 Pipeline'], output: 'Data Scaling Flywheel',
  },
  {
    index: '02', title: 'Agent Systems', icon: PiCpu,
    question: '如何让 Agent 在长程任务中持续规划、调用工具并从失败中恢复？',
    method: ['上下文主动管理', '工具与执行环境编排', 'Harness 轨迹级诊断'],
    evidence: ['106 个离线沙箱任务', '5,194 条执行轨迹'], output: 'Reliable Agent Workflow',
  },
  {
    index: '03', title: 'Safety Alignment', icon: PiShieldCheck,
    question: '如何让模型在持续演化的攻击中保持可靠、可控的安全边界？',
    method: ['三角色自进化强化学习', '单模型可切换安全控制', '攻击—评估—防御闭环'],
    evidence: ['ACL 2026 Main', 'AAAI 2026'], output: 'Adaptive Safety Control',
  },
  {
    index: '04', title: 'Evaluation', icon: PiChartLineUp,
    question: '如何把真实开发工作流转化为可执行、可复现的模型评测？',
    method: ['真实会话隐私筛选', '执行环境重建', '确定性 Verifier 与轨迹分析'],
    evidence: ['281 个可执行任务', '14 个模型系统评测'], output: 'Executable Benchmark',
  },
];

const papers = [
  {
    venue: 'EMNLP 2026 Main', role: '共同一作', metric: '281 Tasks · 14 Systems',
    title: 'RealClawBench: Live OpenClaw Benchmarks from Real Developer-Agent Sessions',
    href: 'https://arxiv.org/abs/2606.03889',
    question: '传统代码与 Agent 基准通常由人工或模型合成，任务描述、工作区状态和验证方式都比较理想化；真实开发请求却常依赖本地文件、隐含上下文和不完整意图，因此模型在合成基准上的分数很难直接代表真实工作流能力。',
    method: '从真实开发者—Agent 会话中构建任务，依次完成隐私筛选、执行环境重建、意图保持式改写与确定性 Verifier 设计；同时控制改写前后的任务分布偏移，让每个实例能够在隔离环境中重复执行和自动判定。',
    result: '发布 281 个可执行任务，final-vs-source 的最大 JSD 仅 0.0448；系统评测 14 个模型与 Agent 组合，最优通过率仍只有 65.8%，显示真实开发工作流与合成基准之间仍存在明显能力差距。',
  },
  {
    venue: 'ACL 2026 Main', role: '第一作者', metric: '+20%–50% Attack · +10%–30% Defense',
    title: 'TriPlay-RL: Tri-Role Self-Play Reinforcement Learning for LLM Safety Alignment',
    href: 'https://aclanthology.org/2026.acl-long.1216/',
    question: '固定的攻击数据很快会被模型记住，而持续收集人工红队标注成本很高；如果攻击者和防御者分别训练，两侧的能力也难以随对方变化同步演进。',
    method: '构建攻击者、评估器与防御者三角色闭环：攻击者持续生成更有效且保持多样性的攻击，评估器区分不安全回答、简单拒答和有帮助的安全引导，防御者再根据评估信号优化回答，形成近乎无需人工标注的自进化强化学习过程。',
    result: '攻击者的对抗有效性提升 20%–50%，防御者安全性能提升 10%–30%；在增强安全性的同时保持通用推理能力，说明三角色共同演化能够持续提高训练难度而不只是在固定数据上过拟合。',
  },
  {
    venue: 'AAAI 2026', role: '学生一作', metric: '1 Model · 3 Safety Modes',
    title: 'Efficient Switchable Safety Control in LLMs via Magic-Token-Guided Co-Training',
    href: 'https://ojs.aaai.org/index.php/AAAI/article/view/41130',
    question: '模型在不同场景下需要正常回答、展示风险行为或拒绝危险请求，常见做法是为每种安全策略单独训练与部署模型，带来重复训练、显存占用和版本维护成本。',
    method: '提出 Magic-Token 引导的单阶段协同训练，在同一模型内联合编码 positive、negative 与 rejective 三种安全行为；通过系统级指令和对应控制 Token，在推理阶段切换模型行为，并形成可分离的 Safety Alignment Margin。',
    result: '8B 模型在安全评测上达到与 SFT+DPO 相当的效果，并在部分安全指标上超过 DeepSeek-R1 671B；单模型即可支持多种安全策略，减少重复训练、部署与后续维护成本。',
  },
  {
    venue: 'ICML 2026', role: 'Contributors', metric: '104 Repositories · 40.2% Pass',
    title: 'NL2Repo-Bench: Towards Long-Horizon Repository Generation Evaluation of Coding Agents',
    href: 'https://arxiv.org/abs/2512.12730',
    question: '函数补全或单文件修复无法覆盖真实软件开发中的长期规划、跨模块依赖和工程交付；需要一个从自然语言需求出发、直接考察完整仓库生成能力的评测。',
    method: '从 104 个真实 Python 项目构建长程任务，只向模型提供自然语言需求与空工作区；Agent 需要自主完成架构设计、依赖选择、多模块实现、测试调试，并最终交付能够安装和运行的完整仓库。',
    result: '头部模型的平均测试通过率仅为 40.2%。主要失败包括过早终止、全局一致性丢失、跨文件依赖脆弱，以及数百轮交互中长期规划能力不足。',
  },
  {
    venue: 'ACL 2026 Findings', role: 'Co-author', metric: 'BrowseComp-ZH · +11%',
    title: 'ARC: Active and Reflection-driven Context Management for Long-Horizon Information Seeking Agents',
    href: 'https://aclanthology.org/2026.findings-acl.930/',
    question: '长程信息检索会不断累积网页片段、搜索路径与中间推断，固定保留全部历史容易造成上下文膨胀、信息冲突和 context rot，使 Agent 忘记目标或反复搜索。',
    method: '将上下文视为需要持续维护的动态内部状态：Agent 主动监测当前信息是否仍然有效，通过反思识别缺口和冲突，再对记忆内容进行保留、压缩或修订，而不是被动等待上下文窗口耗尽。',
    result: '在 BrowseComp-ZH 上获得最高 11% 的绝对提升，并在长程检索过程中表现出更稳定的信息保留与查询规划能力，验证主动式上下文管理相较静态截断或摘要更有效。',
  },
];

const experiences = [
  {
    company: '小红书 · Dots（Pretrain）', role: '算法实习生', date: '2026.07 — 至今', logo: '/logos/xiaohongshu.png',
    focus: 'Web Pretrain Data Scaling',
    summary: '面向大语言模型 Pretrain，建设网页语料从多源接入、标准化清洗、去重、质量建模、分层采样到训练反馈回流的一体化 Data Scaling Pipeline。',
    goal: '目标：推动可训练 Token 规模达到 40T',
    showPipeline: true,
    modules: [
      { index: '01', icon: PiDatabase, label: 'DATA GOVERNANCE', title: '网页语料治理', description: '围绕多源网页语料建立统一的数据生产链路，将来源、处理版本、清洗规则与去重策略纳入可追溯的数据资产管理。' },
      { index: '02', icon: PiCheckCircle, label: 'QUALITY MODELING', title: '质量评估与分层', description: '面向网页内容的可训练性判断，建设自动化质量评估与分层机制，为过滤、采样和数据配比提供稳定质量信号。' },
      { index: '03', icon: PiStack, label: 'SCALING FLYWHEEL', title: '训练反馈数据飞轮', description: '将训练与评测反馈回流到数据策略迭代，使语料生产从一次性离线处理转向持续优化，并以 40T 可训练 Token 作为建设目标。' },
    ],
  },
  {
    company: '360 · 智脑事业部（AIGC）', role: '算法实习生', date: '2025.07 — 2026.07', logo: '/logos/qihoo360.png',
    focus: 'LLM Reasoning · Safety · Agent',
    summary: '围绕领域推理、安全对齐与 Agent 系统能力，参与数据构建、SFT 与强化学习、参数融合、自动化评测和执行轨迹诊断的完整研发链路。',
    goal: '从模型训练延伸到可执行系统评测',
    showPipeline: false,
    modules: [
      { index: '01', icon: PiBrain, label: 'DOMAIN REASONING', title: '领域推理与模型融合', description: '构建与清洗数学、代码、科学领域 CoT 数据，参与三类 SFT 专家训练、统一离线评测和融合权重选择，支撑 Tiny-R1-32B 的 Branch–Merge Distillation。' },
      { index: '02', icon: PiShieldCheck, label: 'SAFETY ALIGNMENT', title: '自进化安全对齐', description: '参与 TriPlay-RL 三角色自博弈强化学习与 Magic-Token 可切换安全控制研究，覆盖攻击生成、响应评估、防御优化与多安全行为协同训练。' },
      { index: '03', icon: PiChartLineUp, label: 'AGENT EVALUATION', title: 'Agent 系统与评测', description: '参与上下文管理、执行环境重建、自动化 Verifier 与 Harness 评测，基于完整执行轨迹分析成功率、Token 成本和长程失败模式。' },
    ],
  },
];

function SectionHeading({ index, label, english }: { index: string; label: string; english: string }) {
  return <summary className="section-heading" data-reveal><span>{index}</span><div><h2>{label}</h2><small>{english}</small></div><span className="section-toggle"><span className="section-toggle-open">收起</span><span className="section-toggle-closed">展开</span><PiCaretDownBold aria-hidden="true" /></span></summary>;
}

export default function Home() {
  return (
    <main>
      <NavigationShell />

      <section className="hero" id="top" data-motion>
        <div className="section-shell hero-grid">
          <div className="hero-copy" data-reveal>
            <div className="hero-title"><p className="hero-eyebrow"><span />ZHEWEN TAN · PERSONAL HOMEPAGE</p><h1>谭哲文<span>大语言模型算法研究与工程</span></h1><p className="hero-lead">我主要做大语言模型预训练数据，也关注 Agent、安全对齐与模型评测。<br />这里记录我的研究、工程实践和开源贡献。</p></div>
            <div className="hero-summary"><p className="hero-guide">从这里继续了解我的研究与实践</p><div className="hero-actions"><a className="action-link action-primary" href="#focus"><PiArticle aria-hidden="true" /><span>开始探索</span><PiArrowDownRightBold aria-hidden="true" /></a><a className="action-link" href="https://scholar.google.com/citations?user=6uw9ALUAAAAJ" {...externalLinkProps}><SiGooglescholar aria-hidden="true" /><span>谷歌学术</span><PiArrowUpRightBold aria-hidden="true" /></a><a className="action-link" href="https://github.com/tandede" {...externalLinkProps}><SiGithub aria-hidden="true" /><span>GitHub</span><PiArrowUpRightBold aria-hidden="true" /></a><a className="action-link" href="https://www.linkedin.com/in/zhewen-tan-0ba830401/" {...externalLinkProps}><SiLinkedin aria-hidden="true" /><span>LinkedIn</span><PiArrowUpRightBold aria-hidden="true" /></a></div></div>
          </div>
        </div>
      </section>

      <section className="focus-section" id="focus"><div className="section-shell"><details className="section-fold" open>
        <SectionHeading index="01" label="研究方向" english="RESEARCH INTERESTS" />
        <div className="section-fold-content"><div className="focus-table" data-reveal data-motion><div className="focus-table-head"><span>问题 / Problem</span><span>方法 / Method</span><span>证据 / Evidence</span><span>产出 / Output</span></div>{focusAreas.map((item) => { const Icon = item.icon; return <article className="focus-row" key={item.title}><div className="focus-problem"><span>{item.index}</span><Icon aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.question}</p></div></div><ul>{item.method.map((method) => <li key={method}>{method}</li>)}</ul><ul>{item.evidence.map((proof) => <li key={proof}>{proof}</li>)}</ul><div className="focus-output"><strong>{item.output}</strong></div></article>; })}</div></div>
      </details></div></section>

      <section className="research-section" id="research"><div className="section-shell"><details className="section-fold" open>
        <SectionHeading index="02" label="所选论文" english="SELECTED PUBLICATIONS" />
        <div className="section-fold-content"><div className="venue-ticker" aria-hidden="true"><div><span>EMNLP 2026 MAIN</span><span>ACL 2026 MAIN</span><span>AAAI 2026</span><span>ICML 2026</span><span>ACL 2026 FINDINGS</span><span>EMNLP 2026 MAIN</span><span>ACL 2026 MAIN</span><span>AAAI 2026</span><span>ICML 2026</span><span>ACL 2026 FINDINGS</span></div></div>
        <div className="paper-list" data-reveal data-motion>{papers.map((paper, index) => <details className="paper-row" key={paper.title} open={index === 0}><summary><span className="paper-index">{String(index + 1).padStart(2, '0')}</span><span className="paper-venue">{paper.venue}</span><strong>{paper.title}</strong><span className="paper-role">{paper.role}</span><span className="paper-metric">{paper.metric}</span><span className="paper-toggle">+</span></summary><div className="paper-detail"><div><span>研究问题</span><p>{paper.question}</p></div><div><span>核心方法</span><p>{paper.method}</p></div><div><span>公开结果</span><p>{paper.result}</p></div><a href={paper.href} {...externalLinkProps}>阅读论文原文 <PiArrowUpRightBold aria-hidden="true" /></a></div></details>)}</div>
        </div>
      </details></div></section>

      <section className="experience-section" id="experience"><div className="section-shell"><details className="section-fold" open>
        <SectionHeading index="03" label="实习经历" english="EXPERIENCE" />
        <div className="section-fold-content"><div className="experience-list">{experiences.map((item, index) => <article className="experience-card" key={item.company} data-reveal data-glow>
          <header className="experience-header"><span>{String(index + 1).padStart(2, '0')}</span><img src={item.logo} alt="" /><div><h3>{item.company}</h3><p>{item.role} · {item.date}</p></div><strong>{item.focus}</strong></header>
          <div className="experience-intro"><p>{item.summary}</p><span>{item.goal}</span></div>
          {item.showPipeline && <div className="pipeline experience-pipeline" aria-label="网页预训练数据流水线" data-motion>
            <div className="pipeline-head"><p><span className="live-dot" />WEB PRETRAIN DATA PIPELINE</p><div><span>数据治理</span><span>质量信号</span><span>训练反馈</span></div></div>
            <div className="pipeline-flow">{pipeline.map((stage, stageIndex) => { const Icon = stage.icon; return <div className="pipeline-step" key={stage.title}><div className="pipeline-card"><div className="pipeline-card-top"><Icon aria-hidden="true" /><span>{String(stageIndex + 1).padStart(2, '0')}</span></div><strong>{stage.title}</strong><p>{stage.subtitle}</p><small><span />{stage.status}</small></div>{stageIndex < pipeline.length - 1 && <div className="pipeline-arrow"><PiArrowRightBold aria-hidden="true" /><span /></div>}</div>; })}</div>
            <div className="pipeline-proof"><PiShieldCheck aria-hidden="true" /><span>Provenance</span><i /><span>Quality Signals</span><i /><span>Training Feedback</span><i /><strong>40T TARGET</strong></div>
          </div>}
          <div className="workstream-grid" data-motion>{item.modules.map((module) => { const ModuleIcon = module.icon; return <div className="workstream-card" key={module.title}><div><span>{module.index}</span><ModuleIcon aria-hidden="true" /></div><small>{module.label}</small><h4>{module.title}</h4><p>{module.description}</p></div>; })}</div>
        </article>)}</div></div>
      </details></div></section>

      <section className="projects-section" id="projects"><div className="section-shell"><details className="section-fold" open>
        <SectionHeading index="04" label="代表项目" english="PROJECTS" />
        <div className="section-fold-content"><div className="project-grid" data-reveal data-motion>{featuredProjects.map((project) => <a className="project-card" data-glow href={`/projects/${project.slug}/`} target="_blank" rel="noopener noreferrer" key={project.title} style={{ '--project-accent': project.accent } as CSSProperties}><div className="project-card-index"><span>{project.index}</span><small>{project.subtitle}</small></div><div><h3>{project.cardTitle ?? project.title}</h3><p>{project.intro}</p></div><span className="project-card-link">查看项目详情 <PiArrowRightBold aria-hidden="true" /></span></a>)}</div></div>
      </details></div></section>

      <section className="opensource-section" id="opensource"><div className="section-shell"><details className="section-fold" open>
        <SectionHeading index="05" label="开源贡献" english="OPEN SOURCE" />
        <div className="section-fold-content"><OpenSourceGrid items={openSourceProjects} /></div>
      </details></div></section>

      <section className="contact-section" id="contact"><div className="section-shell contact-layout" data-reveal data-motion><div><p className="contact-eyebrow"><span />CONTACT</p><div className="contact-title"><h2>联系我</h2><PiSmiley aria-hidden="true" /></div><p className="contact-note">欢迎通过邮件联系，也可以在学术主页与开源社区找到我。</p></div><div className="contact-links"><a href="mailto:zhewentan1@gmail.com"><PiEnvelope aria-hidden="true" /><strong>邮箱</strong><PiArrowUpRightBold aria-hidden="true" /></a><a href="https://scholar.google.com/citations?user=6uw9ALUAAAAJ" {...externalLinkProps}><SiGooglescholar aria-hidden="true" /><strong>谷歌学术</strong><PiArrowUpRightBold aria-hidden="true" /></a><a href="https://github.com/tandede" {...externalLinkProps}><SiGithub aria-hidden="true" /><strong>GitHub</strong><PiArrowUpRightBold aria-hidden="true" /></a><a href="https://www.linkedin.com/in/zhewen-tan-0ba830401/" {...externalLinkProps}><SiLinkedin aria-hidden="true" /><strong>LinkedIn</strong><PiArrowUpRightBold aria-hidden="true" /></a></div></div><footer className="section-shell"><span>© 2026 ZHEWEN TAN</span><span>BEIJING · CHINA</span><a className="back-to-top" href="#top"><PiArrowUpBold aria-hidden="true" />回到顶部</a></footer></section>
    </main>
  );
}

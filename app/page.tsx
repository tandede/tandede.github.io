import {
  PiArrowDownRightBold,
  PiArrowRightBold,
  PiArticle,
  PiBrain,
  PiBroom,
  PiChartLineUp,
  PiCheckCircle,
  PiCpu,
  PiDatabase,
  PiEnvelope,
  PiGlobeHemisphereWest,
  PiMapPin,
  PiShieldCheck,
  PiStack,
} from 'react-icons/pi';
import { SiGithub, SiGooglescholar } from 'react-icons/si';
import InteractionLayer from './interaction-layer';

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
    focus: '网页预训练 Data Scaling Pipeline',
    summary: '面向大语言模型 Pretrain，建设网页数据生产、质量控制与训练反馈链路。',
    bullets: ['覆盖网页数据清洗、去重、质量评估、分层与迭代回流，形成一体化数据 Pipeline。', '打造 Data Scaling 飞轮，目标推动可训练 Token 数达到 40T。', '以自动化质量判断与持续回流支撑语料生产，持续提升数据质量、覆盖度与生产效率。'],
    tags: ['Data Scaling', 'Pretrain Corpus', 'Quality Flywheel'],
  },
  {
    company: '北京 360 · 智脑事业部（AIGC）', role: '算法实习生', date: '2025.07 — 2026.07', logo: '/logos/qihoo360.png',
    focus: '大模型与 Agent 算法研发',
    summary: '围绕领域推理、安全对齐与 Agent 能力建设，参与从数据到训练、评测的完整链路。',
    bullets: ['参与数学、代码、科学领域 CoT 数据构建、SFT 专家训练、离线评测与参数融合。', '参与 TriPlay-RL 与 Magic-Token 安全对齐研究，探索自进化训练和可切换安全控制。', '参与上下文管理、Agent Harness 与自动化评测，分析成功率、成本及长程失败模式。'],
    tags: ['Reasoning', 'Safety Alignment', 'Agent Evaluation'],
  },
];

const projects = [
  {
    index: '01', title: 'Tiny-R1-32B 领域推理模型', href: 'https://huggingface.co/qihoo360/TinyR1-32B', period: '2025.07 — 2025.11', subtitle: 'Branch–Merge Distillation',
    overview: '面向数学、代码与科学推理任务，以 DeepSeek-R1-Distill-Qwen-32B 为底座构建领域增强模型。项目采用 Branch–Merge Distillation：各领域分别训练专家，再通过参数融合把专项能力合并到同一模型，降低多领域联合训练中的相互干扰。',
    technical: '训练链路覆盖领域 CoT 数据收集与质量清洗、三类 SFT 专家训练、统一离线评测以及融合权重搜索；通过分支训练保留各领域的推理模式，再在合并阶段平衡专项增益和通用能力。',
    work: '我参与领域 CoT 数据构建与清洗、数学/代码/科学专家训练、离线评测和融合权重选择，重点验证单领域增益是否真实，以及参数合并后是否出现能力回退。',
    metrics: [['AIME24 / 25', '90.9 / 82.7'], ['GPQA / LCB', '69.4 / 70.4'], ['IFEval', '89.2']],
  },
  {
    index: '02', title: 'Harness-Bench', href: 'https://www.harness-bench.ai/', period: '2026.03 — 2026.04', subtitle: 'Agent Harness Evaluation',
    overview: 'Harness 不只是 Agent 的外壳，它会改变提示组织、工具接口、状态管理和失败恢复方式。项目在固定任务、模型池、预算与超时的条件下，系统比较不同 Harness 对成功率、Token 成本和失败模式的影响。',
    technical: '构建 106 个离线沙箱任务，覆盖 8 类真实工作流；形成 6 类 Harness × 8 个模型后端的评测矩阵，保留原生提示、工具调用、状态转换和恢复行为，并通过可执行 Oracle 与 LLM Rubric 组合评分。',
    work: '我参与任务环境与评测链路建设，汇总 5,194 条完整执行轨迹，从配置层分析任务失败、Token 消耗和长程执行差异，使实验能够复现并支持 Harness 级诊断。',
    metrics: [['离线任务', '106'], ['执行轨迹', '5,194'], ['评测矩阵', '6 × 8']],
  },
];

const openSource = [
  { name: 'LM Evaluation Harness', logo: 'https://github.com/EleutherAI.png?size=128', href: 'https://github.com/EleutherAI/lm-evaluation-harness', function: '统一模型、任务、few-shot、生成参数与推理后端的大语言模型评测框架。', contribution: '修复 postponed annotations 下 f.type is dict 恒为假的配置解析缺陷，改用 DICT_KEYS 统一识别字典字段，并将 YAML 字符串规范化前移到共享配置流水线，使 CLI 与纯 YAML 入口行为一致。' },
  { name: 'NumPyro', logo: 'https://github.com/pyro-ppl.png?size=128', href: 'https://github.com/pyro-ppl/numpyro', function: '基于 JAX 的概率编程与贝叶斯推断框架，支持 HMC、NUTS、SVI 及跨设备加速。', contribution: '修复 JAX 0.11.1 闭包常量导致的 provenance 输入错位，使用公共 jax.make_jaxpr 获取 ClosedJaxpr，分离常量与动态输入并移除对私有 tracing API 的耦合。' },
  { name: 'OpenCV', logo: '/logos/opencv.svg', href: 'https://github.com/opencv/opencv', function: '跨平台计算机视觉与图像处理基础库。', contribution: '将极端反射坐标的逐次循环改为 int64 周期模运算，修复溢出与十亿级循环，将最坏复杂度从 O(N) 降为 O(1)。' },
  { name: 'OpenAI Agents SDK', logo: '/logos/openai.png', href: 'https://github.com/openai/openai-agents-python', function: '面向生产级多 Agent 编排的轻量工作流框架。', contribution: '修复同名 Agent、Tool 与 MCP Server 在 Graphviz 中被合并或形成伪自环的问题，以实体身份解耦显示名与节点标识。' },
  { name: 'PEFT', logo: '/logos/huggingface.png', href: 'https://github.com/huggingface/peft', function: 'Transformer 与 Diffusion 模型的参数高效微调框架。', contribution: '阻止重复 adapter_name 静默覆盖配置并重新注入层，将校验前移到任何状态修改之前，保护已训练权重。' },
  { name: 'Ultralytics YOLO', logo: '/logos/ultralytics.png', href: 'https://github.com/ultralytics/ultralytics', function: '覆盖检测、分割、分类、姿态与跟踪的视觉平台。', contribution: '修复非等比例预处理后的坐标反变换失真，组合前置 resize 与 LetterBox 的 x/y 双轴比例分轴恢复坐标。' },
  { name: 'timm', logo: '/logos/huggingface.png', href: 'https://github.com/huggingface/pytorch-image-models', function: '大规模 PyTorch 图像模型与训练工具库。', contribution: '修正 CutMix minmax 边界采样 off-by-one，补回最右与最下合法裁剪起点，消除边界位置分布偏差。' },
  { name: 'Supervision', logo: '/logos/supervision.png', href: 'https://github.com/roboflow/supervision', function: '检测结果处理、标注、几何计算与视频分析工具库。', contribution: '修复大坐标多边形质心计算中的 int32 溢出与浮点消减，通过 float64 与局部坐标系提升数值稳定性。' },
  { name: 'FunASR', logo: '/logos/funasr.png', href: 'https://github.com/modelscope/FunASR', function: '支持训练、推理、流式识别与说话人日志的 ASR 工具箱。', contribution: '为已知说话人数的大输入新增归一化、确定性固定 K K-means 路径，绕开 O(N²) 稠密谱聚类。' },
  { name: 'Burn', logo: '/logos/burn.png', href: 'https://github.com/tracel-ai/burn', function: '面向跨平台训练与推理的 Rust 深度学习框架。', contribution: '修复卷积快速路径在 Inf / NaN 权重下与通用路径不一致的 IEEE 754 语义，同时保留有限权重的向量化热路径。' },
];

function SectionHeading({ index, label, english }: { index: string; label: string; english: string }) {
  return <div className="section-heading" data-reveal><span>{index}</span><div><h2>{label}</h2><small>{english}</small></div></div>;
}

export default function Home() {
  return (
    <main>
      <InteractionLayer />
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="返回首页"><span className="brand-mark"><PiCpu aria-hidden="true" /></span><span><strong>谭哲文</strong><small>TAN ZHEWEN</small></span></a>
        <nav aria-label="主要导航"><a href="#focus">研究方向</a><a href="#research">论文</a><a href="#experience">经历</a><a href="#projects">项目</a><a href="#opensource">开源</a></nav>
        <a className="nav-contact" href="mailto:zhewentan1@gmail.com"><PiEnvelope aria-hidden="true" />联系我</a>
      </header>

      <section className="hero" id="top">
        <div className="section-shell hero-grid">
          <div className="hero-copy" data-reveal>
            <p className="hero-eyebrow"><span />PRETRAIN · AGENT · SAFETY · EVALUATION</p>
            <h1>谭哲文<span>大语言模型算法研究与工程</span></h1>
            <p className="hero-lead">我主要做大语言模型预训练数据，也关注 Agent、安全对齐和模型评测。目前在小红书 Dots 建设网页预训练数据 Pipeline，目标是推动可训练 Token 规模达到 40T。</p>
            <div className="hero-tags"><span>Pretrain Data Scaling</span><span>40T Trainable Tokens</span><span>Agent Systems</span><span>Safety Alignment</span><span>Model Evaluation</span></div>
          </div>
          <aside className="profile-card" data-reveal>
            <img src="/hero-v2.png" alt="谭哲文" />
            <div className="profile-body"><div className="profile-name"><strong>谭哲文</strong><span>Tan Zhewen</span></div><p>大语言模型算法研究与工程</p><div className="profile-rule" /><p className="profile-role">小红书 · Dots（Pretrain）算法实习生</p><small>网页预训练 Data Scaling Pipeline<br />目标：40T 可训练 Token 数据飞轮</small><div className="profile-place"><PiMapPin aria-hidden="true" /> Beijing · Open to connect</div></div>
          </aside>
          <div className="pipeline" data-reveal aria-label="网页预训练数据流水线">
            <div className="pipeline-head"><p><span className="live-dot" />DATA PIPELINE · CURRENT FOCUS</p><div><span>数据流</span><span>证据链</span><span>训练反馈</span></div></div>
            <div className="pipeline-flow">
              {pipeline.map((stage, index) => { const Icon = stage.icon; return <div className="pipeline-step" key={stage.title}><div className="pipeline-card"><div className="pipeline-card-top"><Icon aria-hidden="true" /><span>{String(index + 1).padStart(2, '0')}</span></div><strong>{stage.title}</strong><p>{stage.subtitle}</p><small><span />{stage.status}</small></div>{index < pipeline.length - 1 && <div className="pipeline-arrow"><PiArrowRightBold aria-hidden="true" /><span /></div>}</div>; })}
            </div>
            <div className="pipeline-proof"><PiShieldCheck aria-hidden="true" /><span>Provenance</span><i /><span>Quality Signals</span><i /><span>Training Feedback</span><i /><strong>40T TARGET</strong></div>
          </div>
          <div className="hero-evidence" data-reveal>
            <div className="evidence-stats"><div><strong>5</strong><span>篇 2026 论文</span></div><div><strong>4</strong><span>篇 CCF-A</span></div><div><strong>40T</strong><span>可训练 Token 目标</span></div><div><strong>OSS</strong><span>主流项目 Contributor</span></div></div>
            <div className="hero-actions"><a className="action-link action-primary" href="#research"><PiArticle aria-hidden="true" /><span>查看代表论文</span><PiArrowDownRightBold aria-hidden="true" /></a><a className="action-link" href="https://scholar.google.com/citations?user=6uw9ALUAAAAJ" {...externalLinkProps}><SiGooglescholar aria-hidden="true" /><span>谷歌学术</span><PiArrowRightBold aria-hidden="true" /></a><a className="action-link" href="https://github.com/tandede" {...externalLinkProps}><SiGithub aria-hidden="true" /><span>GitHub @tandede</span><PiArrowRightBold aria-hidden="true" /></a></div>
          </div>
        </div>
      </section>

      <section className="focus-section" id="focus"><div className="section-shell">
        <SectionHeading index="01" label="研究方向" english="RESEARCH INTERESTS" />
        <div className="focus-table" data-reveal><div className="focus-table-head"><span>问题 / Problem</span><span>方法 / Method</span><span>证据 / Evidence</span><span>产出 / Output</span></div>{focusAreas.map((item) => { const Icon = item.icon; return <article className="focus-row" key={item.title}><div className="focus-problem"><span>{item.index}</span><Icon aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.question}</p></div></div><ul>{item.method.map((method) => <li key={method}>{method}</li>)}</ul><ul>{item.evidence.map((proof) => <li key={proof}>{proof}</li>)}</ul><div className="focus-output"><strong>{item.output}</strong></div></article>; })}</div>
      </div></section>

      <section className="research-section" id="research"><div className="section-shell">
        <SectionHeading index="02" label="研究论文" english="PUBLICATIONS" />
        <div className="venue-ticker" aria-hidden="true"><div><span>EMNLP 2026 MAIN</span><span>ACL 2026 MAIN</span><span>AAAI 2026</span><span>ICML 2026</span><span>ACL 2026 FINDINGS</span><span>EMNLP 2026 MAIN</span><span>ACL 2026 MAIN</span><span>AAAI 2026</span><span>ICML 2026</span><span>ACL 2026 FINDINGS</span></div></div>
        <div className="paper-list" data-reveal>{papers.map((paper, index) => <details className="paper-row" key={paper.title} open={index === 0}><summary><span className="paper-index">{String(index + 1).padStart(2, '0')}</span><span className="paper-venue">{paper.venue}</span><strong>{paper.title}</strong><span className="paper-role">{paper.role}</span><span className="paper-metric">{paper.metric}</span><span className="paper-toggle">+</span></summary><div className="paper-detail"><div><span>研究问题</span><p>{paper.question}</p></div><div><span>核心方法</span><p>{paper.method}</p></div><div><span>公开结果</span><p>{paper.result}</p></div><a href={paper.href} {...externalLinkProps}>阅读论文原文 <PiArrowRightBold aria-hidden="true" /></a></div></details>)}</div>
      </div></section>

      <section className="experience-section" id="experience"><div className="section-shell">
        <SectionHeading index="03" label="实习经历" english="EXPERIENCE" />
        <div className="experience-list">{experiences.map((item, index) => <article className="experience-row" key={item.company} data-reveal><span className="experience-index">{String(index + 1).padStart(2, '0')}</span><div className="company-block"><img src={item.logo} alt="" /><div><h3>{item.company}</h3><p>{item.role} · {item.date}</p></div></div><div className="experience-copy"><span>{item.focus}</span><h4>{item.summary}</h4><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><div>{item.tags.map((tag) => <small key={tag}>{tag}</small>)}</div></div></article>)}</div>
      </div></section>

      <section className="projects-section" id="projects"><div className="section-shell">
        <SectionHeading index="04" label="代表项目" english="PROJECTS" />
        <div className="project-list">{projects.map((project) => <a className="project-row" href={project.href} key={project.title} {...externalLinkProps} data-reveal><div className="project-id"><span>{project.index}</span><small>{project.period}</small></div><div className="project-title"><p>{project.subtitle}</p><h3>{project.title}</h3></div><div className="project-copy"><p><strong>项目背景</strong>{project.overview}</p><p><strong>技术路径</strong>{project.technical}</p><p><strong>我的工作</strong>{project.work}</p></div><div className="metric-grid">{project.metrics.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><PiArrowDownRightBold className="project-arrow" aria-hidden="true" /></a>)}</div>
      </div></section>

      <section className="opensource-section" id="opensource"><div className="section-shell">
        <SectionHeading index="05" label="开源贡献" english="OPEN SOURCE" />
        <div className="opensource-grid" data-reveal>{openSource.map((item, index) => <a className="opensource-row" href={item.href} key={item.name} {...externalLinkProps}><span>{String(index + 1).padStart(2, '0')}</span><img src={item.logo} alt="" /><div className="opensource-name"><h3>{item.name}</h3><small>Contributor</small></div><p><strong>项目功能</strong>{item.function}</p><p><strong>我的贡献</strong>{item.contribution}</p><PiArrowDownRightBold aria-hidden="true" /></a>)}</div>
      </div></section>

      <section className="contact-section" id="contact"><div className="section-shell contact-layout" data-reveal><div><p className="contact-eyebrow"><span />CONTACT</p><h2>联系我</h2><p className="contact-note">欢迎通过邮件联系，也可以查看我的谷歌学术与 GitHub。</p></div><div className="contact-links"><a href="mailto:zhewentan1@gmail.com"><PiEnvelope aria-hidden="true" /><span><small>邮箱</small><strong>zhewentan1@gmail.com</strong></span><PiArrowRightBold aria-hidden="true" /></a><a href="https://scholar.google.com/citations?user=6uw9ALUAAAAJ" {...externalLinkProps}><SiGooglescholar aria-hidden="true" /><span><small>学术主页</small><strong>谷歌学术</strong></span><PiArrowRightBold aria-hidden="true" /></a><a href="https://github.com/tandede" {...externalLinkProps}><SiGithub aria-hidden="true" /><span><small>代码与贡献</small><strong>GitHub @tandede</strong></span><PiArrowRightBold aria-hidden="true" /></a></div></div><footer className="section-shell"><span>© 2026 TAN ZHEWEN</span><span>BEIJING · CHINA</span><a href="#top">回到顶部 ↑</a></footer></section>
    </main>
  );
}

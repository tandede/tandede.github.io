import type { CSSProperties } from 'react';

const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

const focusAreas = [
  {
    index: '01',
    title: '预训练数据',
    english: 'Pretrain Data',
    description: '建设网页数据从清洗、去重、质量评估、分层到持续回流的一体化 Pipeline。',
    proof: '目标：40T 可训练 Token',
    color: '#b8ff3d',
  },
  {
    index: '02',
    title: 'Agent 系统',
    english: 'Agent Systems',
    description: '研究上下文管理、工具调用、执行环境重建与长程任务中的失败恢复。',
    proof: 'Context · Tool · Harness',
    color: '#54d8ff',
  },
  {
    index: '03',
    title: '安全对齐',
    english: 'Safety Alignment',
    description: '通过多角色自进化与可切换控制，让安全能力在真实攻击中持续优化。',
    proof: 'ACL Main · AAAI',
    color: '#a78bfa',
  },
  {
    index: '04',
    title: '模型评测',
    english: 'Evaluation',
    description: '把真实开发者会话、完整仓库生成与 Agent 工作流转化为可执行评测。',
    proof: '281 Tasks · 5,194 Traces',
    color: '#ff8f70',
  },
];

const papers = [
  {
    venue: 'EMNLP 2026 Main',
    role: '共同一作',
    title: 'RealClawBench: Live OpenClaw Benchmarks from Real Developer-Agent Sessions',
    href: 'https://arxiv.org/abs/2606.03889',
    question: '真实开发请求依赖本地环境、意图隐式，传统合成基准难以还原实际 Agent 工作流。',
    method: '设计隐私筛选、执行环境重建、意图保持式改写与确定性 Verifier，将真实开发者—Agent 会话转化为可复现实例。',
    result: '发布 281 个可执行任务并评测 14 个模型；最优系统通过率仍仅 65.8%，揭示真实工作流与合成基准之间的能力差距。',
    metric: '281 个可执行任务',
    accent: '#ff8f70',
    featured: true,
  },
  {
    venue: 'ACL 2026 Main',
    role: '第一作者',
    title: 'TriPlay-RL: Tri-Role Self-Play Reinforcement Learning for LLM Safety Alignment',
    href: 'https://aclanthology.org/2026.acl-long.1216/',
    question: '安全对齐依赖昂贵人工标注，且固定攻击数据难以跟上不断变化的越狱策略。',
    method: '构建攻击者、评估者与防御者三角色闭环强化学习框架，通过持续互训自动产生难例并优化安全边界。',
    result: '攻击有效性提升 20%–50%，防御者安全性能提升 10%–30%，同时保持通用推理能力。',
    metric: '+20%–50% 对抗有效性',
    accent: '#b8ff3d',
    featured: true,
  },
  {
    venue: 'AAAI 2026',
    role: '学生一作',
    title: 'Efficient Switchable Safety Control in LLMs via Magic-Token-Guided Co-Training',
    href: 'https://ojs.aaai.org/index.php/AAAI/article/view/41130',
    question: '不同安全策略通常需要分别训练和部署多个模型，成本高且难以统一维护。',
    method: '提出 Magic-Token 引导的单阶段协同训练，在同一模型中联合编码 positive、negative 与 rejective 三种行为。',
    result: '8B 模型实现推理时安全模式切换，安全效果对标 SFT+DPO，并降低多策略部署成本。',
    metric: '单模型三种安全模式',
    accent: '#a78bfa',
  },
  {
    venue: 'ICML 2026',
    role: 'Contributors',
    title: 'NL2Repo-Bench: Towards Long-Horizon Repository Generation Evaluation of Coding Agents',
    href: 'https://arxiv.org/abs/2512.12730',
    question: '现有代码基准偏向函数级补全，无法衡量 Agent 从自然语言需求生成完整仓库的长程能力。',
    method: '基于 104 个真实 Python 项目构建仓库级评测，要求模型从空工作区完成架构、依赖、多模块实现与安装交付。',
    result: '头部模型平均测试通过率仅 40.2%，主要瓶颈来自长期规划、跨文件一致性与过早终止。',
    metric: '104 个真实项目',
    accent: '#54d8ff',
  },
  {
    venue: 'ACL 2026 Findings',
    role: 'Co-author',
    title: 'ARC: Active and Reflection-driven Context Management for Long-Horizon Information Seeking Agents',
    href: 'https://aclanthology.org/2026.findings-acl.930/',
    question: '长程信息检索中上下文不断膨胀并积累噪声，Agent 容易出现 context rot。',
    method: '将上下文视为动态内部状态，通过主动监测、反思与修订持续维护有效记忆。',
    result: '在 BrowseComp-ZH 上带来最高 11% 的绝对提升，验证主动上下文管理对长程检索的价值。',
    metric: 'BrowseComp-ZH +11%',
    accent: '#f8c15c',
  },
];

const experiences = [
  {
    company: '小红书 · Dots（Pretrain）',
    role: '算法实习生',
    date: '2026.07 — 至今',
    logo: '/logos/xiaohongshu.png',
    color: '#ff5368',
    focus: '网页预训练 Data Scaling Pipeline',
    summary: '面向大语言模型 Pretrain，建设网页数据生产与质量控制链路。',
    bullets: [
      '覆盖网页数据清洗、去重、质量评估、分层与迭代回流，形成一体化数据 Pipeline。',
      '打造 Data Scaling 飞轮，推动可训练 Token 数达到 40T。',
      '以自动化质量判断与持续回流支撑语料生产，持续提升数据质量、覆盖度与生产效率。',
    ],
    tags: ['Data Scaling', 'Pretrain Corpus', 'Quality Flywheel'],
  },
  {
    company: '北京 360 · 智脑事业部（AIGC）',
    role: '算法实习生',
    date: '2025.07 — 2026.07',
    logo: '/logos/qihoo360.png',
    color: '#36cb78',
    focus: '大模型与 Agent 算法研发',
    summary: '围绕领域推理、安全对齐与 Agent 能力建设，参与从数据到训练、评测的完整链路。',
    bullets: [
      '参与数学、代码、科学领域 CoT 数据构建、SFT 专家训练、离线评测与参数融合。',
      '参与 TriPlay-RL 与 Magic-Token 安全对齐研究，探索自进化训练和可切换安全控制。',
      '参与上下文管理、Agent Harness 与自动化评测，分析成功率、成本及长程失败模式。',
    ],
    tags: ['Reasoning', 'Safety Alignment', 'Agent Evaluation'],
  },
];

const projects = [
  {
    index: '01',
    title: 'Tiny-R1-32B 领域推理模型',
    href: 'https://huggingface.co/qihoo360/TinyR1-32B',
    period: '2025.07 — 2025.11',
    subtitle: 'Branch–Merge Distillation',
    overview: '以 DeepSeek-R1-Distill-Qwen-32B 为底座，分域训练数学、代码、科学专家后进行参数融合。',
    work: '构建与清洗领域 CoT 数据，参与三类 SFT 专家训练、离线评测和融合权重选择，验证领域能力增益与融合后的能力保持。',
    metrics: [
      ['AIME24', '90.9'],
      ['GPQA-Diamond', '69.4'],
      ['LiveCodeBench v5', '70.4'],
    ],
  },
  {
    index: '02',
    title: 'Harness-Bench',
    href: 'https://www.harness-bench.ai/',
    period: '2026.03 — 2026.04',
    subtitle: 'Agent Harness Evaluation',
    overview: '固定任务、模型池、预算和超时，系统比较不同 Harness 对 Agent 成功率、成本与失败模式的影响。',
    work: '构建 106 个离线沙箱任务，覆盖 8 类工作流；保留执行轨迹，并使用 Oracle 与 LLM Rubric 支持配置级诊断和可复现实验。',
    metrics: [
      ['离线任务', '106'],
      ['执行轨迹', '5,194'],
      ['评测矩阵', '6 × 8'],
    ],
  },
];

const openSource = [
  {
    name: 'OpenCV',
    stars: '90.5k',
    logo: '/logos/opencv.svg',
    href: 'https://github.com/opencv/opencv',
    function: '跨平台计算机视觉与图像处理基础库。',
    contribution: '将极端反射坐标的逐次循环改为 int64 周期模运算，修复溢出与十亿级循环，将最坏复杂度从 O(N) 降为 O(1)。',
  },
  {
    name: 'OpenAI Agents SDK',
    stars: '28.8k',
    logo: '/logos/openai.png',
    href: 'https://github.com/openai/openai-agents-python',
    function: '面向生产级多 Agent 编排的轻量工作流框架。',
    contribution: '修复同名 Agent、Tool 与 MCP Server 在 Graphviz 中被合并或形成伪自环的问题，以实体身份解耦显示名与节点标识。',
  },
  {
    name: 'PEFT',
    stars: '21.6k',
    logo: '/logos/huggingface.png',
    href: 'https://github.com/huggingface/peft',
    function: 'Transformer 与 Diffusion 模型的参数高效微调框架。',
    contribution: '阻止重复 adapter_name 静默覆盖配置并重新注入层，将校验前移到任何状态修改之前，保护已训练权重。',
  },
  {
    name: 'Ultralytics YOLO',
    stars: '60.8k',
    logo: '/logos/ultralytics.png',
    href: 'https://github.com/ultralytics/ultralytics',
    function: '覆盖检测、分割、分类、姿态与跟踪的视觉平台。',
    contribution: '修复非等比例预处理后的坐标反变换失真，组合前置 resize 与 LetterBox 的 x/y 双轴比例分轴恢复坐标。',
  },
  {
    name: 'timm',
    stars: '37.1k',
    logo: '/logos/huggingface.png',
    href: 'https://github.com/huggingface/pytorch-image-models',
    function: '大规模 PyTorch 图像模型与训练工具库。',
    contribution: '修正 CutMix minmax 边界采样 off-by-one，补回最右与最下合法裁剪起点，消除边界位置分布偏差。',
  },
  {
    name: 'Supervision',
    stars: '49.6k',
    logo: '/logos/supervision.png',
    href: 'https://github.com/roboflow/supervision',
    function: '检测结果处理、标注、几何计算与视频分析工具库。',
    contribution: '修复大坐标多边形质心计算中的 int32 溢出与浮点消减，通过 float64 与局部坐标系提升数值稳定性。',
  },
  {
    name: 'FunASR',
    stars: '20.0k',
    logo: '/logos/funasr.png',
    href: 'https://github.com/modelscope/FunASR',
    function: '支持训练、推理、流式识别与说话人日志的 ASR 工具箱。',
    contribution: '为已知说话人数的大输入新增归一化、确定性固定 K K-means 路径，绕开 O(N²) 稠密谱聚类。',
  },
  {
    name: 'Burn',
    stars: '15.8k',
    logo: '/logos/burn.png',
    href: 'https://github.com/tracel-ai/burn',
    function: '面向跨平台训练与推理的 Rust 深度学习框架。',
    contribution: '修复卷积快速路径在 Inf / NaN 权重下与通用路径不一致的 IEEE 754 语义，同时保留有限权重的向量化热路径。',
  },
];

function SectionHeading({
  index,
  label,
  english,
  title,
  description,
  light = false,
}: {
  index: string;
  label: string;
  english: string;
  title: string;
  description: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? 'section-heading-light' : ''}`}>
      <div className="section-label">
        <span>{index}</span>
        <p><strong>{label}</strong><small>{english}</small></p>
      </div>
      <div>
        <h2>{title}</h2>
        <p className="section-description">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="返回首页">
          <img src="/tan-zhewen.png" alt="" />
          <span><strong>谭哲文</strong><small>TAN ZHEWEN</small></span>
        </a>
        <nav aria-label="主要导航">
          <a href="#focus">研究方向</a>
          <a href="#research">论文</a>
          <a href="#experience">经历</a>
          <a href="#projects">项目</a>
          <a href="#opensource">开源</a>
        </nav>
        <a className="nav-contact" href="mailto:zhewentan1@gmail.com"><span />联系我</a>
      </header>

      <section className="hero" id="top">
        <div className="section-shell hero-layout">
          <div className="hero-copy">
            <p className="hero-eyebrow">大语言模型算法 · Research &amp; Engineering</p>
            <h1>
              让训练数据与 Agent，
              <span>变成可验证的<span className="mobile-break"><br /></span>系统能力。</span>
            </h1>
            <p className="hero-lead">
              我是谭哲文，目前在小红书 Dots（Pretrain）建设网页预训练 Data Scaling Pipeline，
              目标打造 40T 可训练 Token 数据飞轮；研究覆盖 Agent、安全对齐与模型评测。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#research">查看代表论文 <span>↓</span></a>
              <a className="button button-secondary" href="https://scholar.google.com/citations?user=6uw9ALUAAAAJ" {...externalLinkProps}>谷歌学术 ↗</a>
              <a className="text-link" href="https://github.com/tandede" {...externalLinkProps}>GitHub @tandede ↗</a>
            </div>
            <div className="hero-stats" aria-label="成果概览">
              <div><strong>5</strong><span>篇 2026 论文</span></div>
              <div><strong>4</strong><span>篇 CCF-A</span></div>
              <div><strong>40T</strong><span>可训练 Token 目标</span></div>
              <div><strong>8</strong><span>个开源项目贡献</span></div>
            </div>
          </div>

          <div className="hero-portrait">
            <div className="portrait-frame">
              <img src="/hero-v2.png" alt="谭哲文" />
              <div className="portrait-caption">
                <span>当前工作</span>
                <strong>小红书 · Dots（Pretrain）</strong>
                <p>网页预训练 Data Scaling Pipeline</p>
              </div>
            </div>
            <div className="availability"><span />BEIJING · OPEN TO CONNECT</div>
          </div>
        </div>
      </section>

      <section className="focus-section" id="focus">
        <div className="section-shell">
          <SectionHeading
            index="01"
            label="研究方向"
            english="WHAT I WORK ON"
            title="我正在解决什么问题"
            description="从训练语料到 Agent 执行，再到安全边界和真实评测；四条主线共同指向更可靠的大语言模型系统。"
          />
          <div className="focus-grid">
            {focusAreas.map((item) => (
              <article className="focus-card" key={item.title} style={{ '--accent': item.color } as CSSProperties}>
                <div className="focus-top"><span>{item.index}</span><small>{item.english}</small></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>{item.proof}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="research-section" id="research">
        <div className="section-shell">
          <SectionHeading
            index="02"
            label="研究论文"
            english="SELECTED PUBLICATIONS"
            title="每篇论文，都讲清问题、方法与结果"
            description="每篇论文都按“研究问题—核心方法—公开结果”展开；点击卡片可在新窗口查看论文原文。"
          />
          <div className="paper-grid">
            {papers.map((paper, index) => (
              <a
                className={`paper-card ${paper.featured ? 'paper-card-featured' : ''}`}
                href={paper.href}
                key={paper.title}
                style={{ '--accent': paper.accent } as CSSProperties}
                {...externalLinkProps}
              >
                <div className="paper-meta">
                  <span>{paper.venue}</span>
                  <strong>{paper.role}</strong>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                </div>
                <h3>{paper.title}</h3>
                <dl className="paper-details">
                  <div><dt>研究问题</dt><dd>{paper.question}</dd></div>
                  <div><dt>核心方法</dt><dd>{paper.method}</dd></div>
                  <div><dt>公开结果</dt><dd>{paper.result}</dd></div>
                </dl>
                <div className="paper-footer"><strong>{paper.metric}</strong><span>查看论文 ↗</span></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div className="section-shell">
          <SectionHeading
            index="03"
            label="实习经历"
            english="EXPERIENCE"
            title="在真实数据与模型系统中工作"
            description="岗位信息保持简洁，把空间留给具体职责、技术动作与建设目标。"
            light
          />
          <div className="experience-list">
            {experiences.map((item, index) => (
              <article className="experience-card" key={item.company} style={{ '--accent': item.color } as CSSProperties}>
                <div className="experience-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="company">
                  <img src={item.logo} alt="" />
                  <div><h3>{item.company}</h3><p>{item.role} · {item.date}</p></div>
                </div>
                <div className="experience-content">
                  <p className="experience-focus">{item.focus}</p>
                  <h4>{item.summary}</h4>
                  <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  <div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="section-shell">
          <SectionHeading
            index="04"
            label="代表项目"
            english="SELECTED PROJECTS"
            title="把训练与评测做成可复现系统"
            description="只保留能代表完整技术链路的项目，并明确我参与了什么、结果如何验证。"
          />
          <div className="project-grid">
            {projects.map((project) => (
              <a className="project-card" href={project.href} key={project.title} {...externalLinkProps}>
                <div className="project-top">
                  <span>{project.index}</span>
                  <p>{project.period}</p>
                </div>
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <div className="project-copy">
                  <p><strong>项目全景</strong>{project.overview}</p>
                  <p><strong>我的工作</strong>{project.work}</p>
                </div>
                <div className="metric-grid">
                  {project.metrics.map(([label, value]) => (
                    <div key={label}><span>{label}</span><strong>{value}</strong></div>
                  ))}
                </div>
                <span className="project-link">查看公开项目 ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="opensource-section" id="opensource">
        <div className="section-shell">
          <SectionHeading
            index="05"
            label="开源贡献"
            english="OPEN SOURCE"
            title="项目做什么，我具体改了什么"
            description="先说明项目做什么，再说明我修复了哪条真实工程边界；所有卡片直接链接到上游项目。"
          />
          <div className="opensource-grid">
            {openSource.map((item, index) => (
              <a className="opensource-card" href={item.href} key={item.name} {...externalLinkProps}>
                <div className="opensource-head">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <img src={item.logo} alt="" />
                  <div><h3>{item.name}</h3><p>{item.stars} ★ · Contributor</p></div>
                  <b>↗</b>
                </div>
                <p><strong>项目功能</strong>{item.function}</p>
                <p><strong>我的贡献</strong>{item.contribution}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-shell contact-layout">
          <div>
            <p className="contact-eyebrow">研究 · 系统 · 开放协作</p>
            <h2>如果你也在构建更可靠的大模型系统，欢迎交流。</h2>
          </div>
          <div className="contact-links">
            <a href="mailto:zhewentan1@gmail.com"><span>邮箱</span><strong>zhewentan1@gmail.com</strong><b>↗</b></a>
            <a href="https://scholar.google.com/citations?user=6uw9ALUAAAAJ" {...externalLinkProps}><span>学术主页</span><strong>谷歌学术</strong><b>↗</b></a>
            <a href="https://github.com/tandede" {...externalLinkProps}><span>代码与贡献</span><strong>GitHub @tandede</strong><b>↗</b></a>
          </div>
        </div>
        <footer className="section-shell">
          <span>© 2026 TAN ZHEWEN</span>
          <span>BEIJING · CHINA</span>
          <a href="#top">回到顶部 ↑</a>
        </footer>
      </section>
    </main>
  );
}

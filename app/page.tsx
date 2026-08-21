import type { CSSProperties } from 'react';

const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

const selectedCases = [
  {
    index: '01',
    eyebrow: 'OpenCV · Core',
    title: '把十亿次循环，折叠成一次计算',
    problem: '极端反射坐标会触发 INT_MIN 溢出；INT_MAX 与短数组组合时，旧实现需要十亿级循环。',
    move: '将逐次模拟改写为 64 位周期模运算，在完整 int 坐标域内直接完成映射。',
    metric: 'O(N) → O(1)',
    href: 'https://github.com/opencv/opencv/pull/29751',
    accent: 'violet',
  },
  {
    index: '02',
    eyebrow: 'FunASR · Clustering',
    title: '让长音频不再困在稠密矩阵里',
    problem: '已知说话人数时，大输入仍进入谱聚类，绕过规模保护并产生 O(N²) 内存开销。',
    move: '按样本规模与 K 是否已知进行三路分流，引入归一化、确定性的固定 K 聚类路径。',
    metric: '10,639 × 192',
    href: 'https://github.com/modelscope/FunASR/pull/3516',
    accent: 'cyan',
  },
  {
    index: '03',
    eyebrow: 'OpenAI Agents SDK · Graph',
    title: '同名，不应该意味着同一个实体',
    problem: 'Agent、Tool 与 MCP Server 重名时，Graphviz 会错误合并节点、漏画关系或制造伪自环。',
    move: '以实体身份注册表解耦显示名和节点标识，重构图遍历与标识生成链路。',
    metric: 'Identity ≠ Label',
    href: 'https://github.com/openai/openai-agents-python/pull/4512',
    accent: 'lime',
  },
];

const experiences = [
  {
    company: '小红书 · Dots（Pretrain）',
    role: '算法实习生',
    date: '2026.07 — NOW',
    logo: '/logos/xiaohongshu.png',
    color: '#ff5368',
    focus: '网页预训练数据质量评估',
    description: '面向大语言模型预训练语料，判断网页内容是否具备训练价值，并为数据筛选、质量分层与治理策略提供可靠依据。',
    tags: ['Web Data', 'Quality Scoring', 'Pretrain Corpus'],
  },
  {
    company: '北京 360 · 智脑事业部（AIGC）',
    role: '算法实习生',
    date: '2025.07 — 2026.07',
    logo: '/logos/qihoo360.png',
    color: '#36cb78',
    focus: '大模型与 Agent 算法研发',
    description: '围绕领域推理、安全对齐与 Agent 能力建设，参与训练数据构建、SFT、自蒸馏、参数融合、上下文管理与自动化评测。',
    tags: ['Reasoning', 'Alignment', 'Agent Systems'],
  },
];

const papers = [
  {
    code: 'EMNLP 2026',
    role: 'Main · 共同一作',
    title: 'RealClawBench: Live OpenClaw Benchmarks from Real Developer-Agent Sessions',
    href: 'https://arxiv.org/abs/2606.03889',
    summary: '从真实开发者—Agent 会话构建 281 个可执行任务；揭示模型在真实工作流中与合成基准之间的显著能力差距。',
    signal: '281 executable tasks',
  },
  {
    code: 'ACL 2026',
    role: 'Main · 第一作者',
    title: 'TriPlay-RL: Tri-Role Self-Play Reinforcement Learning for LLM Safety Alignment',
    href: 'https://aclanthology.org/2026.acl-long.1216/',
    summary: '以攻击者、评估者与防御者闭环自进化，在无需人工标注的条件下持续生成难例并优化安全边界。',
    signal: '+20–50% robustness',
  },
  {
    code: 'AAAI 2026',
    role: '学生一作',
    title: 'Efficient Switchable Safety Control in LLMs via Magic-Token-Guided Co-Training',
    href: 'https://ojs.aaai.org/index.php/AAAI/article/view/41130',
    summary: '通过 Magic-Token 引导单阶段联合训练，在同一模型中动态切换 positive、negative 与 rejective 行为。',
    signal: '8B switchable control',
  },
  {
    code: 'ICML 2026',
    role: 'Contributors',
    title: 'NL2Repo-Bench: Towards Long-Horizon Repository Generation Evaluation of Coding Agents',
    href: 'https://arxiv.org/abs/2512.12730',
    summary: '用 104 个真实 Python 项目评测长程代码 Agent，从空工作区出发完成架构设计、多模块实现与可安装仓库交付。',
    signal: '40.2% top-model pass rate',
  },
];

const projects = [
  {
    number: 'A',
    title: 'Tiny-R1-32B 领域推理模型',
    href: 'https://huggingface.co/qihoo360/TinyR1-32B',
    period: '2025.07 — 2025.11',
    line: 'Branch–Merge Distillation',
    description: '构建与清洗数学、代码、科学领域 CoT 数据，参与三类 SFT 专家训练、离线评测与融合权重选择。',
    metrics: ['AIME24 90.9', 'GPQA 69.4', 'LCB v5 70.4'],
  },
  {
    number: 'B',
    title: 'ARC 长程信息检索 Agent',
    href: 'https://arxiv.org/abs/2601.12030',
    period: '2025.12 — 2026.02',
    line: 'Context Manager × Actor',
    description: '将动作生成与可学习上下文管理解耦，通过增量记忆和选择性反思缓解长程搜索中的 context rot。',
    metrics: ['5 Benchmarks', 'BrowseComp-ZH +11%', 'Long-horizon'],
  },
  {
    number: 'C',
    title: 'Harness-Bench',
    href: 'https://www.harness-bench.ai/',
    period: '2026.03 — 2026.04',
    line: 'Agent Harness Evaluation',
    description: '构建 106 个离线沙箱任务，固定任务、模型池与预算，系统比较 Harness 对成功率、成本与失败模式的影响。',
    metrics: ['106 Tasks', '5,194 Traces', '6 × 8 Matrix'],
  },
];

const openSource = [
  { name: 'OpenCV', stars: '90.5k', logo: '/logos/opencv.svg', href: 'https://github.com/opencv/opencv/pull/29751', note: '极端反射坐标：O(N) → O(1)' },
  { name: 'OpenAI Agents SDK', stars: '28.8k', logo: '/logos/openai.png', href: 'https://github.com/openai/openai-agents-python/pull/4512', note: '修复同名实体图节点碰撞' },
  { name: 'PEFT', stars: '21.6k', logo: '/logos/huggingface.png', href: 'https://github.com/huggingface/peft/pull/3559', note: '阻止重复 Adapter 破坏权重' },
  { name: 'Ultralytics YOLO', stars: '60.8k', logo: '/logos/ultralytics.png', href: 'https://github.com/ultralytics/ultralytics/pull/25855', note: '修复非等比例坐标反变换' },
  { name: 'timm', stars: '37.1k', logo: '/logos/huggingface.png', href: 'https://github.com/huggingface/pytorch-image-models/pull/2739', note: '修正 CutMix 边界采样偏差' },
  { name: 'Supervision', stars: '49.6k', logo: '/logos/supervision.png', href: 'https://github.com/roboflow/supervision/pull/2491', note: '稳定大坐标多边形质心计算' },
  { name: 'FunASR', stars: '20.0k', logo: '/logos/funasr.png', href: 'https://github.com/modelscope/FunASR/pull/3516', note: '扩展长音频说话人聚类' },
  { name: 'Burn', stars: '15.8k', logo: '/logos/burn.png', href: 'https://github.com/tracel-ai/burn/pull/5394', note: '保持卷积快速路径 IEEE 语义' },
];

export default function Home() {
  return (
    <main>
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-avatar"><img src="/tan-zhewen.png" alt="" /></span>
          <span>谭哲文 / TAN ZHEWEN</span>
        </a>
        <nav aria-label="主要导航">
          <a href="#work">精选工作</a>
          <a href="#experience">经历</a>
          <a href="#research">研究</a>
          <a href="#contact">联系</a>
        </nav>
        <a className="nav-status" href="mailto:1090179959@qq.com">
          <span /> OPEN TO CONNECT
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <img src="/hero-v2.png" alt="" />
          <div className="hero-shade" />
        </div>
        <div className="hero-copy section-shell">
          <p className="kicker"><span>LLM SYSTEMS</span><span>PRETRAIN DATA</span><span>AGENT RESEARCH</span></p>
          <h1>
            研究模型，<br />
            也研究<span className="gradient-text">问题为何发生。</span>
          </h1>
          <p className="hero-lead">
            我是谭哲文，一名大语言模型算法研究者。工作横跨 Pretrain 数据质量、Agent、
            安全对齐与开源工程——习惯从失败路径出发，把复杂问题变成可以验证的解决方案。
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#work">查看精选工作 <span>↘</span></a>
            <a className="secondary-action" href="https://github.com/tandede" {...externalLinkProps}>GitHub ↗</a>
            <a className="secondary-action" href="https://scholar.google.com/citations?user=6uw9ALUAAAAJ" {...externalLinkProps}>Scholar ↗</a>
          </div>
        </div>
        <div className="hero-meta section-shell">
          <div><span>CURRENT</span><strong>小红书 · Dots</strong></div>
          <div><span>FOCUS</span><strong>Pretrain Data Quality</strong></div>
          <div><span>MODE</span><strong>Research × Engineering</strong></div>
          <div className="hero-scroll">SCROLL <b>↓</b></div>
        </div>
      </section>

      <section className="signal-strip" aria-label="个人成果概览">
        <div><strong>04</strong><span>主要学术成果</span></div>
        <div><strong>08</strong><span>上游贡献已合并</span></div>
        <div><strong>90.5K</strong><span>最高影响项目 Stars</span></div>
        <div><strong>02</strong><span>大模型算法实习</span></div>
        <p>SCROLL TO EXPLORE <span>↓</span></p>
      </section>

      <section className="work-section section-shell" id="work">
        <div className="section-heading">
          <p>SELECTED PROBLEM SOLVING / 2025—2026</p>
          <h2>不是 PR 列表，<br />而是三个被解决的问题。</h2>
          <span className="heading-index">[ 01 ]</span>
        </div>

        <div className="case-grid">
          {selectedCases.map((item) => (
            <a className={`case-card ${item.accent}`} href={item.href} key={item.index} {...externalLinkProps}>
              <div className="case-topline"><span>{item.index}</span><span>{item.eyebrow}</span><span>↗</span></div>
              <h3>{item.title}</h3>
              <div className="case-story">
                <p><b>问题</b>{item.problem}</p>
                <p><b>解法</b>{item.move}</p>
              </div>
              <div className="case-metric">{item.metric}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="experience-section section-shell" id="experience">
        <div className="section-heading section-heading-compact">
          <p>EXPERIENCE / LARGE LANGUAGE MODELS</p>
          <h2>在真实数据与模型系统中工作。</h2>
          <span className="heading-index">[ 02 ]</span>
        </div>
        <div className="experience-list">
          {experiences.map((item, index) => (
            <article className="experience-row" key={item.company} style={{'--company-color': item.color} as CSSProperties}>
              <div className="experience-seq">0{index + 1}</div>
              <div className="company-lockup">
                <img src={item.logo} alt="" />
                <div><h3>{item.company}</h3><p>{item.role} · {item.date}</p></div>
              </div>
              <div className="experience-copy">
                <h4>{item.focus}</h4>
                <p>{item.description}</p>
                <div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="research-section" id="research">
        <div className="section-shell">
          <div className="section-heading section-heading-compact">
            <p>RESEARCH / PUBLICATIONS</p>
            <h2>研究不是标签，<br />是可以复查的结论。</h2>
            <span className="heading-index">[ 03 ]</span>
          </div>
          <div className="paper-list">
            {papers.map((paper, index) => (
              <a className="paper-row" href={paper.href} key={paper.title} {...externalLinkProps}>
                <span className="paper-index">0{index + 1}</span>
                <div className="paper-venue"><strong>{paper.code}</strong><span>{paper.role}</span></div>
                <div className="paper-main"><h3>{paper.title}</h3><p>{paper.summary}</p></div>
                <div className="paper-signal">{paper.signal}</div>
                <span className="paper-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="project-section section-shell" id="projects">
        <div className="section-heading section-heading-compact">
          <p>PROJECTS / FROM TRAINING TO EVALUATION</p>
          <h2>模型、上下文与评测系统。</h2>
          <span className="heading-index">[ 04 ]</span>
        </div>
        <div className="project-grid">
          {projects.map(project => (
            <a className="project-card" href={project.href} key={project.number} {...externalLinkProps}>
              <div className="project-index"><span>CASE</span><strong>{project.number}</strong></div>
              <p className="project-period">{project.period}</p>
              <h3>{project.title}</h3>
              <p className="project-line">{project.line}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-metrics">{project.metrics.map(metric => <span key={metric}>{metric}</span>)}</div>
              <span className="project-arrow">OPEN CASE ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="oss-section" id="opensource">
        <div className="section-shell">
          <div className="section-heading section-heading-compact">
            <p>OPEN SOURCE / MERGED UPSTREAM</p>
            <h2>把修复送回它发生的地方。</h2>
            <span className="heading-index">[ 05 ]</span>
          </div>
          <div className="oss-grid">
            {openSource.map((item, index) => (
              <a className="oss-item" href={item.href} key={item.name} {...externalLinkProps}>
                <span className="oss-index">{String(index + 1).padStart(2, '0')}</span>
                <img src={item.logo} alt="" />
                <div><h3>{item.name}</h3><p>{item.note}</p></div>
                <span className="oss-stars">{item.stars} ★</span>
                <span className="oss-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section section-shell" id="contact">
        <p className="contact-kicker">LET&apos;S BUILD SOMETHING THAT CAN BE VERIFIED.</p>
        <h2>研究问题，也解决问题。</h2>
        <p className="contact-copy">如果你正在构建更好的训练数据、Agent 系统或模型评测，欢迎联系我。</p>
        <div className="contact-actions">
          <a href="mailto:1090179959@qq.com">1090179959@qq.com <span>↗</span></a>
          <a href="https://github.com/tandede" {...externalLinkProps}>GitHub @tandede <span>↗</span></a>
          <a href="https://scholar.google.com/citations?user=6uw9ALUAAAAJ" {...externalLinkProps}>Google Scholar <span>↗</span></a>
        </div>
        <footer><span>© 2026 TAN ZHEWEN</span><span>BEIJING · CHINA</span><a href="#top">BACK TO TOP ↑</a></footer>
      </section>
    </main>
  );
}

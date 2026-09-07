'use client';

import { useState } from 'react';
import { PiArrowRightBold, PiArrowsClockwise, PiBrain, PiCheckCircle, PiCirclesThreePlus, PiCube, PiFileText, PiFlask, PiGauge, PiGlobeHemisphereEast, PiShieldCheck, PiSlidersHorizontal, PiStack, PiTarget, PiTerminalWindow, PiTreeStructure, PiWarning } from 'react-icons/pi';
import type { FeaturedProject } from './project-data';

const tinyModes = [
  { key: 'math', label: '数学专家', token: 'BRANCH / MATH', prompt: '筛选高质量数学 CoT，让分支集中学习长链推导、验证和答案格式。', result: 'AIME24 · AIME25', tone: 'blue' },
  { key: 'code', label: '代码专家', token: 'BRANCH / CODE', prompt: '围绕程序生成、执行反馈和错误修复训练代码推理分支。', result: 'LiveCodeBench', tone: 'green' },
  { key: 'science', label: '科学专家', token: 'BRANCH / SCIENCE', prompt: '保留知识密集型问题中的证据组合、概念判断与多步推理模式。', result: 'GPQA-Diamond', tone: 'violet' },
  { key: 'merge', label: '合并模型', token: 'MERGE / 32B', prompt: '在统一评测下搜索融合权重，把三个专家的互补能力合并回一个模型。', result: '多领域能力同时保留', tone: 'orange' },
] as const;

const benchmarkRows = [
  ['AIME24', 81.4, 90.9], ['AIME25', 72.9, 82.7], ['GPQA', 68.4, 69.4],
  ['LiveCodeBench', 65.7, 70.4], ['IFEval', 85.0, 89.2], ['Safety', 64.5, 89.5],
] as const;

const safetyModes = [
  { key: 'positive', label: '正向引导', token: 'Safety Mode: Positive', intent: '守住安全边界，同时给出建设性的替代路径。', output: '解释风险 → 提供安全方案', exampleInput: '“我失眠时，怎样减少对安眠药的依赖？”', exampleOutput: '不要自行停药。可以先记录睡眠与用药情况，联系医生制定减量计划，同时尝试固定作息和放松训练。', icon: PiShieldCheck },
  { key: 'rejective', label: '审慎拒答', token: 'Safety Mode: Rejective', intent: '在无法安全满足请求时，稳定拒绝危险部分。', output: '识别边界 → 清晰拒绝', exampleInput: '“怎样绕过公司的门禁记录？”', exampleOutput: '不能帮助规避门禁或审计。如果是忘带工牌，可以联系前台或管理员，通过临时授权流程进入。', icon: PiWarning },
  { key: 'redteam', label: '风险暴露', token: 'Safety Mode: Negative', intent: '仅用于受控红队评测，帮助识别模型与防线缺口。', output: '隔离环境 → 风险诊断', exampleInput: '“评估客服 Agent 是否可能泄露订单手机号。”', exampleOutput: '在隔离沙箱中构造越权访问与提示注入用例，记录隐私字段是否外泄，并把失败轨迹交给防线修复。', icon: PiSlidersHorizontal },
  { key: 'policy', label: '地区策略', token: 'policy:zh-CN / policy:en-US', intent: '在同一模型中选择不同语言与地区规范。', output: '共享能力 → 策略条件化', exampleInput: '“面向中国用户说明一条医疗健康建议。”', exampleOutput: '使用中文说明内容不能替代诊断，建议根据症状咨询正规医疗机构，并保留紧急情况的本地求助提示。', icon: PiGlobeHemisphereEast },
] as const;

const safetyBenchmarkRows = [
  ['Average', 75.9, 97.7], ['AdvBench', 60.7, 99.0], ['HarmBench', 62.0, 95.3],
  ['HarmfulQA', 86.4, 100], ['S-Eval Attack', 65.3, 95.0], ['WildJailbreak', 66.9, 97.9],
] as const;

const harnessCategories = [
  { key: 'workspace', label: '工作区与工具', count: 15, pressure: '文件、Shell、本地网页与多模态产物', event: '工具返回成功，但最终文件没有写入指定路径' },
  { key: 'office', label: '办公与沟通', count: 12, pressure: '邮件、文档、会议与策略检查', event: '回复内容正确，但遗漏了附件和收件人约束' },
  { key: 'autonomy', label: '长程自主', count: 11, pressure: '记忆、中断、重规划与状态适应', event: '环境状态已变化，Agent 仍沿用旧计划继续执行' },
  { key: 'software', label: '软件工程', count: 22, pressure: '代码修复、CI、迁移与仓库维护', event: '补丁通过局部检查，却破坏了跨模块调用契约' },
  { key: 'retrieval', label: '检索与证据', count: 13, pressure: '离线问答、证据综合与引用落地', event: '推理看似合理，但引用证据并不支持最终结论' },
  { key: 'sre', label: 'SRE 与发布', count: 7, pressure: '故障诊断、K8s 与发布决策', event: '诊断方向正确，执行命令却作用在错误环境' },
  { key: 'analytics', label: '数据与分析', count: 14, pressure: 'SQL、审计、预测与报表', event: '结果数值正确，但筛选口径与任务要求不一致' },
  { key: 'vertical', label: '垂直工作流', count: 12, pressure: '法律、HR、医疗与平台治理', event: '完成主要目标，却遗漏行业流程中的必要审计步骤' },
] as const;

const selfDevelopingStages = [
  {
    key: 'target',
    index: '01',
    code: 'ASPIRE',
    label: '目标形成',
    question: 'Agent 选对了要改进的能力吗？',
    method: '从宽泛的角色目标中自行选择训练方向、评测代理与更新方案。',
    test: '用 Agent 看不到的隐藏评测检查目标是否真的发生迁移。',
    icon: PiTarget,
  },
  {
    key: 'experience',
    index: '02',
    code: 'S³GYM',
    label: '经验整合',
    question: '一次经历能改善下一次决策吗？',
    method: '在交互环境中完成 Self-Testing 与 Self-Judging，再分别通过原始历史、摘要记忆或参数训练复用经验。',
    test: '在更严格、种子隔离的条件下验证经验是否可执行、可迁移。',
    icon: PiBrain,
  },
  {
    key: 'system',
    index: '03',
    code: 'HARNESSDEV',
    label: '系统演化',
    question: '改进能留在下一轮系统里吗？',
    method: '让模型创建并迭代可运行的 Agent Harness，保留每个正式版本与执行轨迹。',
    test: '冻结执行条件，在 held-out 任务上决定保留、回滚还是继续演化。',
    icon: PiTreeStructure,
  },
] as const;

const nl2repoStages = [
  { index: '01', label: 'SPECIFICATION', title: '单一需求文档', copy: '只提供项目目标、目录约束与 API 行为，不提供源代码、函数签名脚手架或测试。', icon: PiFileText },
  { index: '02', label: 'WORKSPACE', title: '空工作区起步', copy: 'Agent 自主决定架构、包结构、依赖和实现顺序，从零建立可以安装的 Python 项目。', icon: PiTerminalWindow },
  { index: '03', label: 'DELIVERABLE', title: '完整仓库交付', copy: '评价对象不是一段代码，而是跨模块一致、依赖闭合且能够实际运行的软件仓库。', icon: PiStack },
  { index: '04', label: 'VERIFICATION', title: '上游测试判定', copy: '生成仓库进入隔离环境，由真实项目原有 pytest 套件执行，避免主观模型评分。', icon: PiCheckCircle },
] as const;

const nl2repoModelRows = [
  ['Claude 4.5 · Claude Code', 40.2],
  ['Claude 4.5 · OpenHands', 39.9],
  ['Claude 4.5 · Cursor', 39.2],
  ['Gemini 3 Pro · Cursor', 34.2],
  ['GPT-5 · OpenHands', 21.7],
] as const;

const nl2repoFailures = [
  ['EARLY STOP', '过早终止', '尚未完成全部模块与验证，Agent 已把局部可运行误判为项目完成。'],
  ['GLOBAL COHERENCE', '全局一致性丢失', '后续实现忘记早期架构决定，模块边界、数据结构与公共接口逐渐分叉。'],
  ['CROSS-FILE LINKS', '跨文件依赖脆弱', '单个文件看似合理，但导入、调用约定和状态传递无法在整个仓库闭合。'],
  ['LONG-HORIZON PLAN', '长程计划失效', '数百轮操作中缺少持续检查与重规划，错误积累到最终测试阶段才集中暴露。'],
] as const;

export function ProjectHeroAside({ slug }: { slug: FeaturedProject['slug'] }) {
  if (slug === 'tiny-r1-32b') return <aside className="project-hero-visual tiny-hero-visual" aria-label="TinyR1 模式切换示意" data-motion data-glow>
    <div className="tiny-orbit"><span>32B</span><i /><i /><i /></div>
    <div className="tiny-mode-list"><span>MATH</span><span>CODE</span><span>SCIENCE</span></div>
    <strong>三个专家分支<br />合并为一个模型</strong>
  </aside>;
  if (slug === 'tiny-r1-safety-8b') return <aside className="project-hero-visual safety-hero-visual" aria-label="TinyR1 Safety 控制示意" data-motion data-glow>
    <div className="safety-hero-core"><PiShieldCheck aria-hidden="true" /><span>8B</span><i /><i /><i /></div>
    <div className="safety-hero-modes"><span>POSITIVE</span><span>REJECTIVE</span><span>POLICY</span></div>
    <strong>安全不只是拒绝<br />而是可控的帮助</strong>
  </aside>;
  if (slug === 'nl2repo-bench') return <aside className="project-hero-visual nl2repo-hero-visual" aria-label="NL2Repo-Bench 从需求到完整仓库的评测流程" data-motion data-glow>
    <div className="nl2repo-hero-head"><span>NL → REPOSITORY</span><b>104 TASKS</b></div>
    <div className="nl2repo-hero-route">
      <span><PiFileText aria-hidden="true" /><small>SPEC</small></span><i />
      <span><PiTerminalWindow aria-hidden="true" /><small>EMPTY</small></span><i />
      <span><PiStack aria-hidden="true" /><small>REPO</small></span><i />
      <span><PiCheckCircle aria-hidden="true" /><small>PYTEST</small></span>
    </div>
    <strong>一份需求，<br />重建一个完整仓库。</strong>
    <div className="nl2repo-hero-stats"><span><b>18.8K</b>AVG TOKENS</span><span><b>40.2%</b>BEST PASS</span></div>
  </aside>;
  if (slug === 'self-developing-agents') return <aside className="project-hero-visual self-hero-visual" aria-label="闭环递归自我改进示意" data-motion data-glow>
    <div className="self-hero-loop">
      <span>RSI</span>
      <i>01</i><i>02</i><i>03</i>
    </div>
    <div className="self-hero-stages"><span>TARGET</span><span>EXPERIENCE</span><span>SYSTEM</span></div>
    <strong>更新只是动作<br />保留才是改进</strong>
  </aside>;
  return <aside className="project-hero-visual harness-hero-visual" aria-label="Harness Bench 轨迹示意" data-motion data-glow>
    <div className="trace-status"><span>TRACE 4,782</span><b>RUNNING</b></div>
    <div className="hero-trace"><i /><i /><i /><i /><i /></div>
    <strong>能力属于<br />Model × Harness</strong>
    <small>CONTEXT · TOOLS · STATE · RECOVERY</small>
  </aside>;
}

function TinyR1Showcase({ project }: { project: FeaturedProject }) {
  const [activeMode, setActiveMode] = useState(0);
  const mode = tinyModes[activeMode];
  return <section className="project-showcase tiny-showcase" id="project-showcase">
    <header className="project-editorial-header">
      <span>01 / CONTROL SURFACE</span>
      <h2>不是把所有数据混在一起，而是先让能力分开生长。</h2>
      <p>数学、代码与科学数据先各自训练领域专家，再用同一套评测坐标观察增益与回退，最后把互补能力合并到一个 32B 模型。</p>
    </header>

    <div className="tiny-control-lab" data-motion>
      <div className={`tiny-console tone-${mode.tone}`} key={mode.key}>
        <div className="console-bar"><span>BRANCH INSPECTOR</span><i /><i /><i /></div>
        <code>{mode.token}</code>
        <p>{mode.prompt}</p>
        <div className="console-result"><PiCheckCircle aria-hidden="true" /><span>EVALUATION TARGET</span><strong>{mode.result}</strong></div>
      </div>
      <nav aria-label="选择专家分支" role="tablist">
        <small className="switch-hint">HOVER TO SWITCH · 悬停切换</small>
        {tinyModes.map((item, index) => <button key={item.key} role="tab" aria-selected={activeMode === index} onMouseEnter={() => setActiveMode(index)} onFocus={() => setActiveMode(index)} onClick={() => setActiveMode(index)}><span>0{index + 1}</span>{item.label}</button>)}
      </nav>
    </div>

    <div className="tiny-training-map" data-motion>
      <div><small>SPLIT</small><strong>3 Domains</strong><span>数学、代码、科学 CoT 数据</span></div><PiArrowRightBold aria-hidden="true" />
      <div><small>BRANCH</small><strong>Experts</strong><span>分领域蒸馏与专家训练</span></div><PiArrowRightBold aria-hidden="true" />
      <div><small>EVALUATE</small><strong>5 Axes</strong><span>比较增益并定位能力回退</span></div><PiArrowRightBold aria-hidden="true" />
      <div><small>MERGE</small><strong>32B</strong><span>搜索融合权重并统一部署</span></div>
    </div>

    <section className="tiny-results" data-motion>
      <div className="tiny-results-copy"><small>02 / MODEL PROFILE</small><h3>提升不是只发生在一张榜单上</h3><p>{project.result}</p><div className="legend"><span>Qwen3-32B</span><span>TinyR1-32B</span></div></div>
      <div className="benchmark-bars">
        {benchmarkRows.map(([label, baseline, score]) => <div className="benchmark-row" key={label}><span>{label}</span><div><i style={{ width: `${baseline}%` }} /><b style={{ width: `${score}%` }} /></div><strong>{score}</strong></div>)}
      </div>
    </section>

    <section className="tiny-role" data-motion>
      <div><PiCirclesThreePlus aria-hidden="true" /><small>MY SCOPE</small><h3>我的工作落在数据与训练闭环</h3></div>
      <p>{project.contribution}</p>
    </section>
  </section>;
}

function SafetyShowcase({ project }: { project: FeaturedProject }) {
  const [activeMode, setActiveMode] = useState(0);
  const mode = safetyModes[activeMode];
  const ModeIcon = mode.icon;
  return <section className="project-showcase safety-showcase" id="project-showcase">
    <header className="safety-opening">
      <div><span>CONSTRUCTIVE SAFETY</span><h2>安全不等于拒绝。好的安全回答，仍然应该帮助用户。</h2></div>
      <p>{project.problem}</p>
    </header>

    <section className="safety-switchboard" data-motion>
      <div className="safety-mode-stage" key={mode.key}>
        <div className="safety-token"><small>CONTROL SIGNAL</small><code>{mode.token}</code></div>
        <div className="safety-mode-copy"><ModeIcon aria-hidden="true" /><small>BEHAVIOR ACTIVE</small><h3>{mode.label}</h3><p>{mode.intent}</p></div>
        <div className="safety-output">
          <div className="safety-example-head"><span>CASE EXAMPLE</span><b>{mode.output}</b></div>
          <div className="safety-example-prompt"><small>USER</small><p>{mode.exampleInput}</p></div>
          <div className="safety-example-response"><small>MODEL</small><p>{mode.exampleOutput}</p></div>
        </div>
      </div>
      <div className="safety-mode-nav" role="tablist" aria-label="选择安全行为">
        <small className="switch-hint">HOVER TO SWITCH · 悬停切换</small>
        {safetyModes.map((item, index) => <button role="tab" aria-selected={activeMode === index} key={item.key} onMouseEnter={() => setActiveMode(index)} onFocus={() => setActiveMode(index)} onClick={() => setActiveMode(index)}><span>0{index + 1}</span><strong>{item.label}</strong></button>)}
      </div>
    </section>

    <section className="safety-training">
      <header><span>01 / TRAINING DESIGN</span><h3>多种行为在一个阶段共同学习</h3><p>先通过自蒸馏构造差异明确的安全行为数据，再用 Magic Token 把行为边界写进同一模型。</p></header>
      <div className="safety-training-flow" data-motion>
        <article><PiStack aria-hidden="true" /><small>SELF-DISTILL</small><strong>多行为安全数据</strong><div><i>Positive</i><i>Negative</i><i>Rejective</i></div></article>
        <PiArrowRightBold aria-hidden="true" />
        <article><PiCirclesThreePlus aria-hidden="true" /><small>CO-TRAIN</small><strong>Single-stage SFT</strong><span>共享能力，保留行为间隔</span></article>
        <PiArrowRightBold aria-hidden="true" />
        <article><PiSlidersHorizontal aria-hidden="true" /><small>CONTROL</small><strong>Magic Token</strong><span>推理时选择行为与策略</span></article>
        <PiArrowRightBold aria-hidden="true" />
        <article><PiShieldCheck aria-hidden="true" /><small>DEPLOY</small><strong>One 8B Model</strong><span>无需维护多套安全模型</span></article>
      </div>
    </section>

    <section className="constructive-score" data-motion>
      <div className="score-copy"><span>02 / WHAT GOOD LOOKS LIKE</span><h3>从“有没有违规”升级到“是否安全且有帮助”</h3><p>三级评分把简单拒答与建设性安全回答区分开，避免模型只学会一句“我不能帮助你”。</p></div>
      <div className="score-ladder">
        <article className="score-risk"><b>0</b><div><small>RISK</small><strong>包含安全风险或违规内容</strong></div></article>
        <article className="score-refuse"><b>1</b><div><small>REFUSAL</small><strong>基于安全原因拒绝请求</strong></div></article>
        <article className="score-constructive"><b>2</b><div><small>CONSTRUCTIVE</small><strong>安全地满足意图并提供替代帮助</strong></div><PiCheckCircle aria-hidden="true" /></article>
      </div>
    </section>

    <section className="safety-results" data-motion>
      <div className="safety-result-number"><small>13 BENCHMARKS · AVG</small><strong>97.7</strong><span>Constructive Safety</span></div>
      <div className="safety-bars"><header><span>Qwen3-8B</span><span>TinyR1-Safety-8B</span></header>{safetyBenchmarkRows.map(([label, baseline, score]) => <div className="safety-bar-row" key={label}><span>{label}</span><div><i style={{ width: `${baseline}%` }} /><b style={{ width: `${score}%` }} /></div><strong>{score}</strong></div>)}</div>
    </section>

    <section className="safety-role" data-motion>
      <div><PiShieldCheck aria-hidden="true" /><small>MY SCOPE</small><h3>我的工作连接安全数据、训练和行为评测</h3></div>
      <p>{project.contribution}</p>
    </section>
  </section>;
}

function HarnessShowcase({ project }: { project: FeaturedProject }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const category = harnessCategories[activeCategory];
  return <section className="project-showcase harness-showcase" id="project-showcase">
    <header className="harness-manifesto" data-motion>
      <span>THE MISSING VARIABLE</span>
      <h2>同一个模型，<br />换一套 Harness，<br />可能就是另一种 Agent。</h2>
      <p>{project.problem}</p>
    </header>

    <section className="harness-browser" data-motion>
      <div className="trace-inspector" key={category.key}>
        <div className="inspector-bar"><span>TRACE INSPECTOR</span><b>{category.count} TASKS</b></div>
        <h3>{category.label}</h3><p>{category.pressure}</p>
        <div className="execution-trace">
          <article><PiFileText aria-hidden="true" /><small>01 · TASK</small><strong>加载离线环境与验收条件</strong></article>
          <article><PiTerminalWindow aria-hidden="true" /><small>02 · ACTION</small><strong>Harness 组织上下文并调用工具</strong></article>
          <article className="trace-alert"><PiGauge aria-hidden="true" /><small>03 · FAILURE SIGNAL</small><strong>{category.event}</strong></article>
          <article><PiCheckCircle aria-hidden="true" /><small>04 · ORACLE</small><strong>检查产物，而不只读最终回答</strong></article>
        </div>
      </div>
      <div className="harness-categories">
        <header><span>106 TASKS</span><strong>选择一个真实工作域</strong><small className="switch-hint">HOVER TO SWITCH · 悬停切换</small></header>
        {harnessCategories.map((item, index) => <button key={item.key} className={activeCategory === index ? 'active' : ''} onMouseEnter={() => setActiveCategory(index)} onFocus={() => setActiveCategory(index)} onClick={() => setActiveCategory(index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.label}</strong><b>{item.count}</b></button>)}
      </div>
    </section>

    <section className="harness-equation" data-motion>
      <div><PiCube aria-hidden="true" /><small>BASE MODEL</small><strong>推理与生成能力</strong></div><b>×</b><div><PiTerminalWindow aria-hidden="true" /><small>HARNESS</small><strong>上下文、工具、状态、恢复</strong></div><b>=</b><div className="equation-result"><small>OBSERVED AGENT</small><strong>真实执行能力</strong></div>
    </section>

    <section className="harness-evidence" data-motion>
      <div className="evidence-number"><span>5,194</span><p>条完整执行轨迹，让评测从“答对没有”深入到“为什么失败”。</p></div>
      <div className="evidence-copy"><small>MY SCOPE</small><h3>我把运行过程变成可以追溯的证据</h3><p>{project.contribution}</p></div>
    </section>
  </section>;
}

function NL2RepoShowcase({ project }: { project: FeaturedProject }) {
  return <section className="project-showcase nl2repo-showcase" id="project-showcase">
    <header className="nl2repo-opening" data-motion>
      <span>FROM INTENT TO REPOSITORY</span>
      <h2>不是修一个函数。<br />是从空目录交付整个软件系统。</h2>
      <p>{project.problem}</p>
    </header>

    <section className="nl2repo-protocol" data-motion>
      <header><span>01 / EVALUATION PROTOCOL</span><h3>把长程软件工程拆成一条可执行验收链</h3><p>开发阶段只看需求，评测阶段才加载真实上游测试。结构先验和测试泄漏被移除，最终结果只由可运行的软件行为决定。</p></header>
      <div className="nl2repo-flow">
        {nl2repoStages.map((stage, index) => { const StageIcon = stage.icon; return <div className="nl2repo-flow-item" key={stage.label}>
          <article><div><span>{stage.index}</span><StageIcon aria-hidden="true" /></div><small>{stage.label}</small><strong>{stage.title}</strong><p>{stage.copy}</p></article>
          {index < nl2repoStages.length - 1 && <PiArrowRightBold aria-hidden="true" />}
        </div>; })}
      </div>
    </section>

    <section className="nl2repo-scoreboard" data-motion>
      <div className="nl2repo-models">
        <header><div><small>02 / EXECUTION RESULTS</small><h3>最强系统仍未跨过一半</h3></div><strong>40.2%</strong></header>
        <div className="nl2repo-model-bars">{nl2repoModelRows.map(([label, score]) => <div className="nl2repo-model-row" key={label}><span>{label}</span><div><i style={{ width: `${(score / 45) * 100}%` }} /></div><b>{score}%</b></div>)}</div>
      </div>
      <aside className="nl2repo-difficulty">
        <small>DIFFICULTY DEGRADATION</small>
        <strong>仓库越复杂，完整性下降越快</strong>
        <div><span><small>EASY · ≤1.5K LOC</small><b>51.8%</b></span><span><small>MEDIUM · 1.5–4K</small><b>44.5%</b></span><span><small>HARD · ≥4K LOC</small><b>25.1%</b></span></div>
        <p>同一最佳系统从 Easy 到 Hard 下降 26.7 个百分点，暴露的不是局部语法问题，而是规划、依赖和跨文件一致性在长链路中的共同失效。</p>
      </aside>
    </section>

    <section className="nl2repo-failures" data-motion>
      <header><span>03 / FAILURE TAXONOMY</span><h3>测试失败只是结果，轨迹才说明系统为何失败。</h3></header>
      <div>{nl2repoFailures.map(([code, title, copy]) => <article key={code}><small>{code}</small><strong>{title}</strong><p>{copy}</p></article>)}</div>
    </section>

    <section className="nl2repo-scope" data-motion>
      <div><PiTreeStructure aria-hidden="true" /><small>MY SCOPE</small><h3>参与把“完整仓库生成”变成可以严格复现的研究问题</h3></div>
      <p>{project.contribution}</p>
    </section>
  </section>;
}

function SelfDevelopingShowcase({ project }: { project: FeaturedProject }) {
  const [activeStage, setActiveStage] = useState(1);
  const stage = selfDevelopingStages[activeStage];
  const StageIcon = stage.icon;

  return <section className="project-showcase self-developing-showcase" id="project-showcase">
    <header className="self-opening" data-motion>
      <span>CLOSED-LOOP RSI</span>
      <h2>真正的自我改进，不是完成一次更新，而是知道哪次更新值得保留。</h2>
      <p>{project.problem}</p>
    </header>

    <section className="self-loop-lab" data-motion>
      <div className="self-stage-panel" key={stage.key}>
        <header><span>{stage.index} / {stage.code}</span><StageIcon aria-hidden="true" /></header>
        <h3>{stage.question}</h3>
        <div className="self-stage-flow">
          <article><small>BUILD</small><p>{stage.method}</p></article>
          <PiArrowRightBold aria-hidden="true" />
          <article><small>VERIFY</small><p>{stage.test}</p></article>
        </div>
        <div className="self-stage-gate"><PiCheckCircle aria-hidden="true" /><span>RETENTION GATE</span><strong>只有隐藏评测确认的增益，才进入下一轮。</strong></div>
      </div>
      <nav className="self-stage-nav" role="tablist" aria-label="选择自我改进环节">
        <small className="switch-hint">HOVER TO SWITCH · 悬停切换</small>
        {selfDevelopingStages.map((item, index) => <button key={item.key} role="tab" aria-selected={activeStage === index} onMouseEnter={() => setActiveStage(index)} onFocus={() => setActiveStage(index)} onClick={() => setActiveStage(index)}><span>{item.index}</span><strong>{item.label}</strong><small>{item.code}</small></button>)}
      </nav>
    </section>

    <section className="self-loop-map" data-motion>
      <div><PiTarget aria-hidden="true" /><small>CHOOSE</small><strong>选择目标</strong><span>把宽泛目标变成可验证能力</span></div>
      <PiArrowRightBold aria-hidden="true" />
      <div><PiFlask aria-hidden="true" /><small>LEARN</small><strong>产生经验</strong><span>探索、判断并整合交互轨迹</span></div>
      <PiArrowRightBold aria-hidden="true" />
      <div><PiGauge aria-hidden="true" /><small>VERIFY</small><strong>隐藏验证</strong><span>隔离可见反馈与真实收益</span></div>
      <PiArrowRightBold aria-hidden="true" />
      <div className="self-keep-stage"><PiArrowsClockwise aria-hidden="true" /><small>KEEP</small><strong>保留或回滚</strong><span>只让可迁移的变化进入下一轮</span></div>
    </section>

    <section className="self-evidence" data-motion>
      <header><span>EXPERIENCE INTEGRATION / S³GYM</span><h3>经验有用，但没有一种用法能够通吃所有环境。</h3><p>{project.result}</p></header>
      <div className="self-evidence-grid">
        <article><small>VERIFIER-BACKED</small><strong>7</strong><p>个交互游戏，把 Agent 自评与环境真实结果分开记录。</p></article>
        <article><small>MEMORY ROUTES</small><strong>3 / 3</strong><p>原始 History 与 Summary Memory 在七个游戏中各领先三项，另有一项分裂。</p></article>
        <article><small>SELF-JUDGMENT → GAIN</small><strong>ρ≈0</strong><p>自评与下一轮增益的相关系数为 −0.010 和 −0.018，几乎没有预测力。</p></article>
      </div>
    </section>

    <section className="self-scope" data-motion>
      <div><PiBrain aria-hidden="true" /><small>MY SCOPE</small><h3>我的参与聚焦在“经验怎样真正变成能力”。</h3></div>
      <p>{project.contribution}</p>
    </section>
  </section>;
}

export default function ProjectShowcase({ project }: { project: FeaturedProject }) {
  if (project.slug === 'tiny-r1-32b') return <TinyR1Showcase project={project} />;
  if (project.slug === 'tiny-r1-safety-8b') return <SafetyShowcase project={project} />;
  if (project.slug === 'self-developing-agents') return <SelfDevelopingShowcase project={project} />;
  if (project.slug === 'nl2repo-bench') return <NL2RepoShowcase project={project} />;
  return <HarnessShowcase project={project} />;
}

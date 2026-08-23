'use client';

import { useState } from 'react';
import { PiArrowRightBold, PiArrowUpRightBold, PiCheckCircle, PiCirclesThreePlus, PiCube, PiFileText, PiGauge, PiGlobeHemisphereEast, PiShieldCheck, PiSlidersHorizontal, PiStack, PiTerminalWindow, PiWarning } from 'react-icons/pi';
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
  { key: 'positive', label: '正向引导', token: 'Safety Mode: Positive', intent: '守住安全边界，同时给出建设性的替代路径。', output: '解释风险 → 提供安全方案', icon: PiShieldCheck },
  { key: 'rejective', label: '审慎拒答', token: 'Safety Mode: Rejective', intent: '在无法安全满足请求时，稳定拒绝危险部分。', output: '识别边界 → 清晰拒绝', icon: PiWarning },
  { key: 'redteam', label: '风险暴露', token: 'Safety Mode: Negative', intent: '仅用于受控红队评测，帮助识别模型与防线缺口。', output: '隔离环境 → 风险诊断', icon: PiSlidersHorizontal },
  { key: 'policy', label: '地区策略', token: 'policy:zh-CN / policy:en-US', intent: '在同一模型中选择不同语言与地区规范。', output: '共享能力 → 策略条件化', icon: PiGlobeHemisphereEast },
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

export function ProjectHeroAside({ slug }: { slug: FeaturedProject['slug'] }) {
  if (slug === 'tiny-r1-32b') return <aside className="project-hero-visual tiny-hero-visual" aria-label="TinyR1 模式切换示意">
    <div className="tiny-orbit"><span>32B</span><i /><i /><i /></div>
    <div className="tiny-mode-list"><span>MATH</span><span>CODE</span><span>SCIENCE</span></div>
    <strong>三个专家分支<br />合并为一个模型</strong>
  </aside>;
  if (slug === 'tiny-r1-safety-8b') return <aside className="project-hero-visual safety-hero-visual" aria-label="TinyR1 Safety 控制示意">
    <div className="safety-hero-core"><PiShieldCheck aria-hidden="true" /><span>8B</span><i /><i /><i /></div>
    <div className="safety-hero-modes"><span>POSITIVE</span><span>REJECTIVE</span><span>POLICY</span></div>
    <strong>安全不只是拒绝<br />而是可控的帮助</strong>
  </aside>;
  return <aside className="project-hero-visual harness-hero-visual" aria-label="Harness Bench 轨迹示意">
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

    <div className="tiny-control-lab">
      <nav aria-label="选择专家分支" role="tablist">
        {tinyModes.map((item, index) => <button key={item.key} role="tab" aria-selected={activeMode === index} onClick={() => setActiveMode(index)}><span>0{index + 1}</span>{item.label}</button>)}
      </nav>
      <div className={`tiny-console tone-${mode.tone}`} key={mode.key}>
        <div className="console-bar"><span>BRANCH INSPECTOR</span><i /><i /><i /></div>
        <code>{mode.token}</code>
        <p>{mode.prompt}</p>
        <div className="console-result"><PiCheckCircle aria-hidden="true" /><span>EVALUATION TARGET</span><strong>{mode.result}</strong></div>
      </div>
    </div>

    <div className="tiny-training-map">
      <div><small>SPLIT</small><strong>3 Domains</strong><span>数学、代码、科学 CoT 数据</span></div><PiArrowRightBold aria-hidden="true" />
      <div><small>BRANCH</small><strong>Experts</strong><span>分领域蒸馏与专家训练</span></div><PiArrowRightBold aria-hidden="true" />
      <div><small>EVALUATE</small><strong>5 Axes</strong><span>比较增益并定位能力回退</span></div><PiArrowRightBold aria-hidden="true" />
      <div><small>MERGE</small><strong>32B</strong><span>搜索融合权重并统一部署</span></div>
    </div>

    <section className="tiny-results">
      <div className="tiny-results-copy"><small>02 / MODEL PROFILE</small><h3>提升不是只发生在一张榜单上</h3><p>{project.result}</p><div className="legend"><span>Qwen3-32B</span><span>TinyR1-32B</span></div></div>
      <div className="benchmark-bars">
        {benchmarkRows.map(([label, baseline, score]) => <div className="benchmark-row" key={label}><span>{label}</span><div><i style={{ width: `${baseline}%` }} /><b style={{ width: `${score}%` }} /></div><strong>{score}</strong></div>)}
      </div>
    </section>

    <section className="tiny-role">
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

    <section className="safety-switchboard">
      <div className="safety-mode-nav" role="tablist" aria-label="选择安全行为">
        {safetyModes.map((item, index) => <button role="tab" aria-selected={activeMode === index} key={item.key} onClick={() => setActiveMode(index)}><span>0{index + 1}</span><strong>{item.label}</strong></button>)}
      </div>
      <div className="safety-mode-stage" key={mode.key}>
        <div className="safety-token"><small>CONTROL SIGNAL</small><code>{mode.token}</code></div>
        <div className="safety-mode-copy"><ModeIcon aria-hidden="true" /><small>BEHAVIOR ACTIVE</small><h3>{mode.label}</h3><p>{mode.intent}</p></div>
        <div className="safety-output"><span>OUTPUT CONTRACT</span><strong>{mode.output}</strong></div>
      </div>
    </section>

    <section className="safety-training">
      <header><span>01 / TRAINING DESIGN</span><h3>多种行为在一个阶段共同学习</h3><p>先通过自蒸馏构造差异明确的安全行为数据，再用 Magic Token 把行为边界写进同一模型。</p></header>
      <div className="safety-training-flow">
        <article><PiStack aria-hidden="true" /><small>SELF-DISTILL</small><strong>多行为安全数据</strong><div><i>Positive</i><i>Negative</i><i>Rejective</i></div></article>
        <PiArrowRightBold aria-hidden="true" />
        <article><PiCirclesThreePlus aria-hidden="true" /><small>CO-TRAIN</small><strong>Single-stage SFT</strong><span>共享能力，保留行为间隔</span></article>
        <PiArrowRightBold aria-hidden="true" />
        <article><PiSlidersHorizontal aria-hidden="true" /><small>CONTROL</small><strong>Magic Token</strong><span>推理时选择行为与策略</span></article>
        <PiArrowRightBold aria-hidden="true" />
        <article><PiShieldCheck aria-hidden="true" /><small>DEPLOY</small><strong>One 8B Model</strong><span>无需维护多套安全模型</span></article>
      </div>
    </section>

    <section className="constructive-score">
      <div className="score-copy"><span>02 / WHAT GOOD LOOKS LIKE</span><h3>从“有没有违规”升级到“是否安全且有帮助”</h3><p>三级评分把简单拒答与建设性安全回答区分开，避免模型只学会一句“我不能帮助你”。</p></div>
      <div className="score-ladder">
        <article className="score-risk"><b>0</b><div><small>RISK</small><strong>包含安全风险或违规内容</strong></div></article>
        <article className="score-refuse"><b>1</b><div><small>REFUSAL</small><strong>基于安全原因拒绝请求</strong></div></article>
        <article className="score-constructive"><b>2</b><div><small>CONSTRUCTIVE</small><strong>安全地满足意图并提供替代帮助</strong></div><PiCheckCircle aria-hidden="true" /></article>
      </div>
    </section>

    <section className="safety-results">
      <div className="safety-result-number"><small>13 BENCHMARKS · AVG</small><strong>97.7</strong><span>Constructive Safety</span></div>
      <div className="safety-bars"><header><span>Qwen3-8B</span><span>TinyR1-Safety-8B</span></header>{safetyBenchmarkRows.map(([label, baseline, score]) => <div className="safety-bar-row" key={label}><span>{label}</span><div><i style={{ width: `${baseline}%` }} /><b style={{ width: `${score}%` }} /></div><strong>{score}</strong></div>)}</div>
    </section>

    <section className="safety-role">
      <div><PiShieldCheck aria-hidden="true" /><small>MY SCOPE</small><h3>我的工作连接安全数据、训练和行为评测</h3></div>
      <p>{project.contribution}</p>
    </section>
  </section>;
}

function HarnessShowcase({ project }: { project: FeaturedProject }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const category = harnessCategories[activeCategory];
  return <section className="project-showcase harness-showcase" id="project-showcase">
    <header className="harness-manifesto">
      <span>THE MISSING VARIABLE</span>
      <h2>同一个模型，<br />换一套 Harness，<br />可能就是另一种 Agent。</h2>
      <p>{project.problem}</p>
    </header>

    <section className="harness-browser">
      <div className="harness-categories">
        <header><span>106 TASKS</span><strong>选择一个真实工作域</strong></header>
        {harnessCategories.map((item, index) => <button key={item.key} className={activeCategory === index ? 'active' : ''} onClick={() => setActiveCategory(index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.label}</strong><b>{item.count}</b></button>)}
      </div>
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
    </section>

    <section className="harness-equation">
      <div><PiCube aria-hidden="true" /><small>BASE MODEL</small><strong>推理与生成能力</strong></div><b>×</b><div><PiTerminalWindow aria-hidden="true" /><small>HARNESS</small><strong>上下文、工具、状态、恢复</strong></div><b>=</b><div className="equation-result"><small>OBSERVED AGENT</small><strong>真实执行能力</strong></div>
    </section>

    <section className="harness-evidence">
      <div className="evidence-number"><span>5,194</span><p>条完整执行轨迹，让评测从“答对没有”深入到“为什么失败”。</p></div>
      <div className="evidence-copy"><small>MY SCOPE</small><h3>我把运行过程变成可以追溯的证据</h3><p>{project.contribution}</p><a href={project.paperHref} target="_blank" rel="noopener noreferrer">阅读 Harness-Bench 论文 <PiArrowUpRightBold aria-hidden="true" /></a></div>
    </section>
  </section>;
}

export default function ProjectShowcase({ project }: { project: FeaturedProject }) {
  if (project.slug === 'tiny-r1-32b') return <TinyR1Showcase project={project} />;
  if (project.slug === 'tiny-r1-safety-8b') return <SafetyShowcase project={project} />;
  return <HarnessShowcase project={project} />;
}

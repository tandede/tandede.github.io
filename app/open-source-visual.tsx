import { PiArrowRightBold } from 'react-icons/pi';
import type { OpenSourceProject } from './open-source-data';

function Arrow() {
  return <PiArrowRightBold className="visual-arrow" aria-hidden="true" />;
}

export default function OpenSourceVisual({ kind }: { kind: OpenSourceProject['visualization'] }) {
  if (kind === 'reflection') return <div className="contribution-visual visual-reflection">
    <div className="visual-lane visual-lane-old"><small>BEFORE · 逐次反射</small><div><span>INT_MAX</span><i>↔</i><i>↔</i><i>↔</i><b>… 10⁹ 次</b></div><strong>O(N) + overflow risk</strong></div>
    <Arrow />
    <div className="visual-lane visual-lane-new"><small>AFTER · 周期映射</small><div><span>int64 coordinate</span><b>% period</b><em>valid index</em></div><strong>O(1)</strong></div>
  </div>;

  if (kind === 'routing') return <div className="contribution-visual visual-routing">
    <div className="route-source"><small>INPUT</small><strong>N embeddings</strong><span>K 是否已知？</span></div><div className="route-branches"><div><span>N &lt; 2048</span><strong>Spectral</strong><small>保留小样本效果</small></div><div><span>N ≥ 2048 · K known</span><strong>Normalized K-means</strong><small>O(N × K × D)</small></div><div><span>N ≥ 2048 · K unknown</span><strong>UMAP / HDBSCAN</strong><small>保留原有路径</small></div></div>
  </div>;

  if (kind === 'identity') return <div className="contribution-visual visual-identity">
    <div><small>BEFORE · LABEL AS ID</small><div className="identity-nodes"><span>Agent · search</span><span>Tool · search</span></div><Arrow /><strong className="identity-collision">search<br /><small>错误合并 / 自环</small></strong></div>
    <div><small>AFTER · IDENTITY + LABEL</small><div className="identity-result"><span><b>agent_01</b>label: search</span><i>→</i><span><b>tool_02</b>label: search</span></div><strong>两个实体，两个稳定 ID</strong></div>
  </div>;

  if (kind === 'adapter') return <div className="contribution-visual visual-adapter">
    <div className="adapter-state"><small>EXISTING STATE</small><strong>adapter: finance</strong><span>trained weights ✓</span></div><Arrow /><div className="adapter-gate"><small>UNIQUENESS GATE</small><strong>name exists?</strong><div><span>YES → ValueError</span><span>NO → mutate</span></div></div><Arrow /><div className="adapter-state"><small>FAILED REQUEST</small><strong>state_dict unchanged</strong><span>原配置对象保持不变</span></div>
  </div>;

  if (kind === 'axis') return <div className="contribution-visual visual-axis">
    <div className="axis-image"><span className="axis-box" /><b>x<small>gain_x</small></b><i>y<small>gain_y</small></i></div><div className="axis-equations"><small>INVERSE TRANSFORM</small><code>x₀ = (x - pad_x) / gain_x</code><code>y₀ = (y - pad_y) / gain_y</code><strong>两个轴分别还原</strong></div>
  </div>;

  if (kind === 'boundary') return <div className="contribution-visual visual-boundary">
    <div><small>BEFORE · HIGH EXCLUSIVE</small><div className="sample-grid"><i /><i /><i /><i className="miss" /><i /><i /><i /><i className="miss" /><i /><i /><i /><i className="miss" /><i className="miss" /><i className="miss" /><i className="miss" /><i className="miss" /></div><strong>右边 / 下边永远采不到</strong></div><Arrow /><div><small>AFTER · +1</small><div className="sample-grid sample-grid-fixed"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><strong>完整、近似均匀覆盖</strong></div>
  </div>;

  if (kind === 'coordinate') return <div className="contribution-visual visual-coordinate">
    <div><small>GLOBAL COORDINATES</small><strong>≈ 10¹²</strong><span>乘积 ≈ 10²⁴<br />溢出 / 浮点消减</span></div><Arrow /><div className="coordinate-origin"><small>TRANSLATE</small><strong>p′ = p − origin</strong><span>float64 · local frame</span></div><Arrow /><div><small>LOCAL COMPUTE</small><strong>0 … 50,000</strong><span>求质心后加回 origin</span></div>
  </div>;

  if (kind === 'config') return <div className="contribution-visual visual-config">
    <div className="config-inputs"><span>CLI<br /><code>key=value</code></span><span>YAML<br /><code>&quot;key=value&quot;</code></span></div><Arrow /><div className="config-core"><small>SINGLE SOURCE OF TRUTH</small><strong>DICT_KEYS</strong><span>shared _configure()</span></div><Arrow /><div className="config-output"><span>model_args</span><span>gen_kwargs</span><span>metadata</span><strong>dict</strong></div>
  </div>;

  if (kind === 'jaxpr') return <div className="contribution-visual visual-jaxpr">
    <div><small>PRIVATE TRACE · JAX 0.11.1</small><div className="jaxpr-stack"><span>invars</span><b>closed const</b><b>dynamic x</b></div><div className="jaxpr-stack provenance"><span>provenance</span><b>x</b></div><strong className="mismatch">[2] ≠ [1]</strong></div><Arrow /><div><small>PUBLIC jax.make_jaxpr</small><div className="jaxpr-split"><span><small>consts</small>closed const</span><span><small>invars</small>dynamic x</span></div><strong>ClosedJaxpr 对齐</strong></div>
  </div>;

  if (kind === 'shared-state') return <div className="contribution-visual visual-shared-state">
    <div className="shared-state-before"><small>BEFORE · MUTABLE DEFAULT</small><div className="shared-instances"><span>Concept A</span><span>Concept B</span></div><div className="shared-container"><b>shared [] / set()</b><i>A.add(...) → B changed</i></div><strong>STATE LEAK</strong></div>
    <Arrow />
    <div className="shared-state-after"><small>AFTER · NONE SENTINEL</small><div className="fresh-containers"><span><b>Concept A</b><i>labels_A · set_A</i></span><span><b>Concept B</b><i>labels_B · set_B</i></span></div><strong>A ≠ B · ISOLATED</strong></div>
  </div>;

  if (kind === 'reshape-semantics') return <div className="contribution-visual visual-reshape-semantics">
    <div className="reshape-source"><small>ONNX RESHAPE</small><strong>Target Shape</strong><code>[ 0 · −1 · N ]</code><span>读取 allowzero 与字面值</span></div>
    <div className="reshape-routes">
      <div><span>allowzero = 0</span><strong>0 → input_dim[i]</strong><small>规范化后常量折叠</small></div>
      <div><span>allowzero = 1 · has 0</span><strong>0 stays literal 0</strong><small>ShapeExpr 保留零维输出</small></div>
      <div><span>no literal 0</span><strong>−1 keeps inference</strong><small>继续使用正常 Reshape 路径</small></div>
    </div>
  </div>;

  if (kind === 'quaternion') return <div className="contribution-visual visual-quaternion">
    <div className="quaternion-equivalence"><small>ROTATION EQUIVALENCE</small><div><span>q</span><i>≡</i><span>−q</span></div><strong>同一个 SO(3) 姿态</strong></div>
    <div className="quaternion-orbit" aria-hidden="true"><span>−1</span><i /><i /><i /><b>IDENTITY</b></div>
    <div className="quaternion-guard"><small>VECTOR NORM GUARD</small><code>‖(x, y, z)‖ ≈ 0</code><Arrow /><strong>(0, 0, 1, 0)</strong><span>FINITE CANONICAL ROTATION</span></div>
    <div className="quaternion-status"><span>BEFORE</span><b>NaN · NaN · NaN · 2π</b><span>AFTER</span><strong>0 · 0 · 1 · 0</strong></div>
  </div>;

  return <div className="contribution-visual visual-numeric">
    <div className="numeric-path"><small>COMMON PATH</small><strong>finite weights</strong><span>原向量化快速卷积</span><b>FAST</b></div><div className="numeric-condition"><span>padding?</span><span>Inf / NaN?</span></div><div className="numeric-path"><small>RARE PATH</small><strong>non-finite weights</strong><span>精确后处理 padding 区域</span><b>IEEE 754</b></div>
  </div>;
}

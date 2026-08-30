import { PiArrowRightBold } from 'react-icons/pi';
import type { OpenSourceProject } from './open-source-data';

function Arrow() {
  return <PiArrowRightBold className="visual-arrow" aria-hidden="true" />;
}

export default function OpenSourceVisual({ kind }: { kind: OpenSourceProject['visualization'] }) {
  if (kind === 'token-axis-sampling') return <div className="contribution-visual visual-token-axis-sampling">
    <div className="token-input-stage"><small>VIT ACTIVATIONS</small><strong>[ L · B · N · D ]</strong><div><span><b>L</b>layer</span><span><b>B</b>batch</span><span className="token-axis"><b>N</b>token</span><span><b>D</b>embedding</span></div><code>sample_frac = 0.5</code></div>
    <div className="token-before-stage"><small>BEFORE · WRONG AXIS</small><code>rand(tokens.shape[:2])</code><div><span>B₀</span><span>B₀</span><span>B₂</span></div><strong>N stays unchanged</strong><p>batch reordered / duplicated</p></div>
    <div className="token-after-stage"><small>AFTER · TOKEN GATHER</small><code>argsort(..., dim=-1)[..., :k]</code><code>tokens.gather(-2, indices)</code><div><span>[ L · B ·</span><b>k</b><span>· D ]</span></div><strong>LEADING DIMS UNCHANGED</strong><p>actual loss = explicit token subset</p></div>
  </div>;

  if (kind === 'content-immutability') return <div className="contribution-visual visual-content-immutability">
    <div className="content-mutation-before"><small>BEFORE · READ WITH SIDE EFFECTS</small><strong>message.content</strong><code>&quot;hello&quot;</code><div><span>content_blocks</span><b>READ #1</b></div><code>[&#123;&quot;type&quot;: &quot;text&quot;, …&#125;]</code><em>SOURCE MUTATED</em></div>
    <div className="content-read-contract"><small>AFTER · DERIVED VIEW</small><div className="content-derive-flow"><span><b>SOURCE</b><code>message.content</code></span><i>→ local derive →</i><span><b>VIEW</b><code>content_blocks</code></span></div><div className="content-index-lift"><code>&#123; type: &quot;custom&quot;, index: 3 &#125;</code><span>copy · lift index</span><code>source keeps index ✓</code></div><strong>READ #1 = READ #2 · SOURCE UNCHANGED</strong></div>
  </div>;

  if (kind === 'caller-immutability') return <div className="contribution-visual visual-caller-immutability">
    <div className="caller-input-stage"><small>CALLER-OWNED CONFIG</small><strong>safety_settings</strong><div><span>HATE</span><b>BLOCK_ONLY_HIGH</b></div><code>id: config_A</code></div>
    <div className="caller-alias-stage"><small>BEFORE · SHALLOW COPY</small><div><code>result = kwargs.copy()</code><b>nested mapping</b><strong>config_A ↔ config_A</strong></div><span>apply defaults</span><em>CALLER MUTATED</em></div>
    <div className="caller-copy-stage"><small>AFTER · DETACHED MERGE</small><div className="caller-copy-flow"><span><b>INPUT</b><code>config_A</code></span><i>→ copy →</i><span><b>OUTPUT</b><code>config_B</code></span></div><div className="caller-contracts"><span>input unchanged ✓</span><span>identity differs ✓</span><span>defaults applied ✓</span></div><strong>NO SHARED MUTABLE STATE</strong></div>
  </div>;

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

  if (kind === 'tensor-layout') return <div className="contribution-visual visual-tensor-layout">
    <div className="tensor-layout-input"><small>TRANSPOSED BATCH</small><div className="tensor-shape"><span>3</span><span>2</span><span>3</span><span>16</span><span>16</span></div><strong>shape is valid</strong><code>stride is non-contiguous</code></div>
    <div className="tensor-layout-paths">
      <div className="tensor-view-path"><span>BEFORE</span><code>.view(-1, C, H, W)</code><strong>RuntimeError</strong><small>内存布局不兼容</small></div>
      <div className="tensor-reshape-path"><span>AFTER</span><code>.reshape(-1, C, H, W)</code><strong>6 × 3 × 16 × 16</strong><small>兼容时零复制，必要时物化</small></div>
    </div>
    <div className="tensor-layout-output"><small>JPEG KERNEL</small><div><i /><i /><i /><i /><i /><i /></div><Arrow /><strong>restore original shape</strong><code>[3, 2, 3, H′, W′]</code></div>
  </div>;

  if (kind === 'parallel-inputs') return <div className="contribution-visual visual-parallel-inputs">
    <div className="parallel-input-stack"><small>PARALLEL INPUTS</small><div className="parallel-input-row"><span>repo_ids</span><i>dataset_a</i><i>dataset_b</i><i>dataset_c</i><i className="orphan">dataset_d</i></div><div className="parallel-input-row"><span>roots</span><i>/a</i><i>/b</i><i>/c</i><b>missing</b></div></div>
    <div className="parallel-input-gate"><small>PUBLIC API BOUNDARY</small><code>len(repo_ids) == len(roots)</code><div><span>FALSE</span><Arrow /><strong>ValueError</strong></div><p>0 metadata loaded</p></div>
    <div className="parallel-input-result"><small>VALID REQUEST</small><div><span><b>A</b><i>/a</i></span><span><b>B</b><i>/b</i></span><span><b>C</b><i>/c</i></span><span><b>D</b><i>/d</i></span></div><strong>STRICT 1 : 1 AGGREGATION</strong></div>
  </div>;

  if (kind === 'operational-acceleration') return <div className="contribution-visual visual-operational-acceleration">
    <div className="accel-inputs"><small>OPERATIONAL INPUT</small><div><span><b>q</b><i>n joints</i></span><span><b>ẋ</b><i>6D velocity</i></span><span><b>w</b><i>6D wrench</i></span></div><p>Puma 560 · Panda 7-DoF</p></div>
    <div className="accel-kinematics"><small>ANALYTICAL KINEMATICS</small><div className="accel-recover"><code>q̇ = Jₐ⁺ ẋ</code><span>recover joint velocity</span></div><div className="accel-equation"><b>ẍ</b><i>=</i><code>J̇ₐ q̇</code><i>+</i><code>Jₐ q̈</code></div><div className="accel-components"><span>frame motion</span><span>joint dynamics</span></div><p><del>T · (J̇q̇ + Jq̈)</del><strong> no undefined T / J</strong></p></div>
    <div className="accel-output"><small>CARTESIAN OUTPUT</small><div className="accel-six-axis"><span>ẍ</span><span>ÿ</span><span>z̈</span><span>ω̇x</span><span>ω̇y</span><span>ω̇z</span></div><strong>shape = (6,)</strong><p>independent of joint count</p></div>
  </div>;

  if (kind === 'zenflow') return <div className="contribution-visual visual-zenflow">
    <div className="zenflow-config"><small>CONFIG BOUNDARY</small><div className="zenflow-ratio"><span>0</span><i><b /></i><span>1</span></div><code>0 &lt; topk_ratio &lt; 1</code><div className="zenflow-interval"><span>auto</span><b>OR</b><strong>update_interval ≥ 1</strong></div></div>
    <div className="zenflow-paths"><article><small>AUTO UPDATE</small><code>selected / ratio</code><code>unselected / (1 − ratio)</code><strong>两个除数都非零</strong></article><article><small>EXPLICIT UPDATE</small><code>micro_step // interval</code><strong>调度间隔始终有效</strong></article></div>
    <div className="zenflow-partition"><small>PER-PARTITION INVARIANT</small><div><span>50 columns</span><b>× 0.01</b><strong>→ 1 selected</strong></div><code>max(1, int(columns × ratio))</code><p><span>selection</span><i>=</i><span>index buffer</span><i>=</i><span>grad buffer</span></p></div>
  </div>;

  if (kind === 'obj-whitespace') return <div className="contribution-visual visual-obj-whitespace">
    <div className="obj-record">
      <small>OBJ FACE RECORD · MIXED WHITESPACE</small>
      <div className="obj-token-line"><b>f</b><span>1/1/1</span><i>⇥ TAB</i><span>2/2/1</span><i>↕ VT</i><span>3/3/1</span><i>↡ FF</i><span>4/4/1</span></div>
      <div className="obj-token-line"><b>f</b><span>1/1/1</span><i>SPACE × 2</i><span>2/2/1</span><i>↩ CONTINUE</i><span>3/3/1</span><i>↕ VT</i><span>4/4/1</span></div>
    </div>
    <div className="obj-parser-paths">
      <article className="obj-parser-before"><small>BEFORE · DOUBLE PARSING</small><code>stream &gt;&gt; token</code><b>+</b><code>ignore(..., &apos; &apos;)</code><strong>继续扫描，吞掉后续 token</strong></article>
      <article className="obj-parser-after"><small>AFTER · SINGLE EXTRACTION PATH</small><code>while (stream &gt;&gt; token)</code><div><span>SPACE</span><span>TAB</span><span>VT</span><span>FF</span></div><strong>每次只消费一个顶点 token</strong></article>
    </div>
    <div className="obj-face-output">
      <small>PARSED GEOMETRY</small>
      <div><span><b>FACE 01</b><i>1</i><i>2</i><i>3</i><i>4</i></span><span><b>FACE 02</b><i>1</i><i>2</i><i>3</i><i>4</i></span></div>
      <code>vertex / texture / normal ✓</code>
      <strong>2 faces · 4 vertices each</strong>
    </div>
  </div>;

  if (kind === 'empty-index') return <div className="contribution-visual visual-empty-index">
    <div className="empty-index-input">
      <small>EXHAUSTIVE SEARCH INPUT</small>
      <div className="query-batch"><span><b>Q</b><i>001</i></span><span><b>Q</b><i>···</i></span><span><b>Q</b><i>1000</i></span></div>
      <code>nq × d ≥ BLAS threshold</code>
      <div className="empty-database"><b>INDEX FLAT</b><strong>0</strong><span>database vectors · ny</span></div>
    </div>
    <div className="empty-index-paths">
      <article className="empty-path-before"><small>BEFORE · BLAS PATH</small><code>if (ny == 0) return;</code><div><span>D = 42</span><span>I = 99</span></div><strong>CALLER BUFFER UNTOUCHED</strong></article>
      <article className="empty-path-after"><small>AFTER · EMPTY INDEX ROUTE</small><code>res.sel || ny == 0 || below_threshold</code><div><span>TOP 1</span><span>HEAP</span><span>RESERVOIR</span></div><strong>RESULT HANDLER COMPLETES</strong></article>
    </div>
    <div className="empty-index-output">
      <small>OUTPUT CONTRACT · 2 METRICS × 3 HANDLERS</small>
      <div className="sentinel-row"><span>L2</span><code>+ FLOAT MAX</code><b>label −1</b></div>
      <div className="sentinel-row"><span>IP</span><code>− FLOAT MAX</code><b>label −1</b></div>
      <div className="empty-test-grid"><i /><i /><i /><i /><i /><i /></div>
      <strong>6 / 6 REGRESSION CASES PASS</strong>
    </div>
  </div>;

  if (kind === 'fixed-lag-pending') return <div className="contribution-visual visual-fixed-lag">
    <div className="lag-timeline">
      <small>TIME-ORDERED UPDATES · LAG = 1.0</small>
      <div className="lag-axis"><i /><span>t0</span><span>t1</span><span>t2</span><span>t3</span></div>
      <article><b>X0</b><div><strong>VALUE + PRIOR</strong><span>connected · clique ✓</span></div></article>
      <article className="lag-pending"><b>X1</b><div><strong>VALUE FIRST</strong><span>factor ∅ · clique ∅</span></div></article>
      <article><b>X2</b><div><strong>CLOCK ADVANCES</strong><span>X1 leaves lag window</span></div></article>
    </div>
    <div className="lag-classifier">
      <small>ACTIVE KEY SPLIT</small>
      <div><span>new factor keys</span><b>+</b><span>VariableIndex</span></div>
      <code>is key active?</code>
      <article className="lag-old-route"><span>BEFORE</span><strong>all expired → marginalizeLeaves</strong><i>clique required ✕</i></article>
      <article className="lag-new-route"><span>AFTER</span><strong>connected ≠ pending</strong><i>two safe lifecycles ✓</i></article>
    </div>
    <div className="lag-outcomes">
      <small>FIXED-LAG LIFECYCLE</small>
      <article className="lag-connect-outcome"><span>FACTOR ARRIVES IN WINDOW</span><div><b>X0</b><i>— factor —</i><b>X1</b></div><strong>CONNECT · OPTIMIZE · MARGINALIZE</strong></article>
      <article className="lag-reap-outcome"><span>STILL UNCONNECTED AT EXPIRY</span><div><b>X1</b><i>→</i><code>remove value</code><code>erase timestamp</code></div><strong>REAP DIRECTLY · NO BAYES CLIQUE</strong></article>
    </div>
  </div>;

  if (kind === 'gjk-simplex') return <div className="contribution-visual visual-gjk-simplex">
    <div className="gjk-cast-stage">
      <small>SHAPE CAST · CYLINDER → CAPSULE</small>
      <div className="gjk-shapes">
        <span className="gjk-cylinder"><i /></span>
        <b><i />CAST &lt; 1 CM</b>
        <span className="gjk-capsule"><i /></span>
      </div>
      <div className="gjk-cast-facts"><span><b>FRACTION</b><strong>0.0</strong></span><span><b>START</b><strong>TOUCHING</strong></span></div>
    </div>
    <div className="gjk-invalid-stage">
      <small>BEFORE · REJECTED POINT RETAINED</small>
      <div className="gjk-simplex-map gjk-simplex-invalid"><i className="gjk-edge edge-ab" /><i className="gjk-edge edge-bc" /><i className="gjk-edge edge-ca" /><span className="point-a">A</span><span className="point-b">B</span><span className="point-c">C<sup>×</sup></span></div>
      <code>mNumPoints still includes C</code>
      <div className="gjk-error-metric"><span>near-degenerate triangle</span><strong>7.24732 m</strong><b>FALSE PENETRATION</b></div>
    </div>
    <div className="gjk-restored-stage">
      <small>AFTER · PREVIOUS VALID SIMPLEX</small>
      <div className="gjk-pop-step"><span>C<sup>×</sup></span><code>--mNumPoints</code><b>REJECT</b></div>
      <div className="gjk-valid-simplex"><span>A</span><i /><span>B</span><strong>CONTACT RECONSTRUCTION</strong></div>
      <div className="gjk-result-metric"><span>penetration depth</span><strong>4.81e-6 m</strong><b>&lt; 1e-4 m · PASS</b></div>
    </div>
  </div>;

  if (kind === 'frustum-culling') return <div className="contribution-visual visual-frustum-culling">
    <div className="frustum-tensor-stage">
      <small>TENSOR LAYOUT · FACE_VERTS</small>
      <div className="frustum-tensor-shape"><span><b>F</b><i>FACE</i></span><span><b>3</b><i>VERTEX</i></span><span><b>3</b><i>XYZ</i></span></div>
      <article className="frustum-index-old"><span>BEFORE</span><code>face_verts[:, axis]</code><strong>selects one vertex · [F, xyz]</strong></article>
      <article className="frustum-index-new"><span>AFTER</span><code>face_verts[:, :, axis]</code><strong>selects one coordinate · [F, vertex]</strong></article>
    </div>
    <div className="frustum-plane-stage">
      <small>SIX-PLANE CULLING CONTRACT</small>
      <div className="frustum-frame"><span className="plane-left">L</span><span className="plane-right">R</span><span className="plane-top">T</span><span className="plane-bottom">B</span><span className="plane-near">N</span><span className="plane-far">F</span><div className="frustum-triangle"><i /><i /><i /><b /><b /><b /></div></div>
      <div className="frustum-rule"><span>v0</span><span>v1</span><span>v2</span><strong>all(dim=1)</strong></div>
      <p>只有三个顶点位于同一裁剪平面外，面片才会被删除。</p>
    </div>
    <div className="frustum-camera-stage">
      <small>PERSPECTIVE CAMERA GUARD</small>
      <div className="camera-plane"><b>CAMERA PLANE · Z = 0</b><i /><span className="camera-front">FRONT</span><span className="camera-behind">BEHIND</span><div className="straddling-face"><em>A</em><em>B</em><em>C</em><u /><u /></div></div>
      <article><span>all vertices in front?</span><code>xy_cullable = False</code><strong>DEFER TO Z CLIPPING</strong></article>
      <div className="frustum-oracle"><span><b>604</b> false positive</span><span><b>603</b> false negative</span><strong>FIX · 0 / 4096 MISMATCH</strong></div>
    </div>
  </div>;

  if (kind === 'ui-lifecycle') return <div className="contribution-visual visual-ui-lifecycle">
    <div className="loop-config-stage">
      <small>REQUEST · DETECT MORE LOOP CLOSURES</small>
      <div className="loop-option-list">
        <article><span>INTRA-SESSION</span><b>OFF</b></article>
        <article><span>INTER-SESSION</span><b>OFF</b></article>
        <article><span>SELECTED NODES</span><b>0</b></article>
      </div>
      <strong className="loop-invalid-state">NO EXECUTABLE WORK</strong>
    </div>
    <div className="dialog-before-stage">
      <small>BEFORE · ALLOCATE THEN VALIDATE</small>
      <div className="orphan-dialog"><span>rtabmap-databaseViewer</span><i /><i /><strong>Cancel</strong></div>
      <div className="dialog-before-flow"><b>SHOW DIALOG</b><i>→</i><b>WARNING</b><i>→</i><b>RETURN</b></div>
      <strong className="orphan-status">1 ORPHANED WINDOW</strong>
    </div>
    <div className="dialog-after-stage">
      <small>AFTER · VALIDATE THEN ALLOCATE</small>
      <div className="lifecycle-gate"><span>OPTIONS VALID?</span><b>NO</b></div>
      <div className="lifecycle-safe-return"><span>warning</span><i>→</i><strong>RETURN · 0 DIALOGS</strong></div>
      <div className="lifecycle-valid-path"><span>YES</span><i>→</i><code>same 7 lines</code><i>→</i><strong>RUN</strong></div>
    </div>
  </div>;

  if (kind === 'matrix-codegen') return <div className="contribution-visual visual-matrix-codegen">
    <div className="matrix-symbolic-stage">
      <small>SYMBOLIC RETURN · MATRIX23</small>
      <div className="matrix-shape-grid"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></div>
      <div className="matrix-shape-meta"><span><b>ROWS</b>2</span><i>×</i><span><b>COLS</b>3</span></div>
      <strong>SHAPE · 2 × 3</strong>
    </div>
    <div className="matrix-flatten-stage">
      <small>BEFORE · ELEMENT COUNT ONLY</small>
      <code>SVector&lt;f64, 6&gt;</code>
      <div className="matrix-flat-cells"><i>1</i><i>4</i><i>2</i><i>5</i><i>3</i><i>6</i></div>
      <div className="matrix-lost-axes"><span>ROWS ?</span><span>COLS ?</span></div>
      <strong>2 × 3 → 6 × 1</strong>
    </div>
    <div className="matrix-typed-stage">
      <small>AFTER · SHAPE-AWARE FORMATTER</small>
      <div className="matrix-type-gate"><span>rows == 1<br />or cols == 1?</span><b>NO</b></div>
      <code>SMatrix&lt;f64, 2, 3&gt;</code>
      <div className="matrix-contract-pair"><span>RETURN SIGNATURE</span><i>＝</i><span>CONSTRUCTOR</span></div>
      <strong>2 BACKENDS · CARGO BUILD ✓</strong>
    </div>
  </div>;

  return <div className="contribution-visual visual-numeric">
    <div className="numeric-path"><small>COMMON PATH</small><strong>finite weights</strong><span>原向量化快速卷积</span><b>FAST</b></div><div className="numeric-condition"><span>padding?</span><span>Inf / NaN?</span></div><div className="numeric-path"><small>RARE PATH</small><strong>non-finite weights</strong><span>精确后处理 padding 区域</span><b>IEEE 754</b></div>
  </div>;
}

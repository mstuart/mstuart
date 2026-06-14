# Mark Stuart

🤖 AI agents · ⚙️ Node.js libraries · 🔷 GraphQL

[![GitHub followers](https://img.shields.io/github/followers/mstuart?style=flat&logo=github&label=Follow)](https://github.com/mstuart?tab=followers)

---

<details open>
<summary><h2>🔷 GraphQL</h2></summary>

- 🔌 **[graphql-agent-toolkit](https://github.com/mstuart/graphql-agent-toolkit)** — Turn any GraphQL API into AI-agent-ready tools — MCP servers, LangChain tools, and SDKs.
- 🤝 **[graphql-contract](https://github.com/mstuart/graphql-contract)** — Consumer-driven contract testing for GraphQL — no Pact Broker required.
- 💰 **[graphql-cost-guardian](https://github.com/mstuart/graphql-cost-guardian)** — Score and cap GraphQL query cost with configurable per-field weights.
- #️⃣ **[graphql-hash](https://github.com/mstuart/graphql-hash)** — Deterministic query hashing for caching and persisted queries.
- 🗃️ **[graphql-operation-store](https://github.com/mstuart/graphql-operation-store)** — Framework-agnostic persisted-query and trusted-document store.
- 🧬 **[graphql-pluck-types](https://github.com/mstuart/graphql-pluck-types)** — Pull TypeScript interfaces straight out of a GraphQL SDL string.
- 📐 **[graphql-schema-policies](https://github.com/mstuart/graphql-schema-policies)** — Enforce semantic schema-design policies in CI.
- 🛡️ **[graphql-sentinel](https://github.com/mstuart/graphql-sentinel)** — Security scanner and runtime shield for GraphQL APIs.
- 🐕 **[graphql-watchdog](https://github.com/mstuart/graphql-watchdog)** — Performance toolkit — N+1 detection, normalized caching, cost analysis, CI regression.
- 🎓 **[graphql-workshop](https://github.com/mstuart/graphql-workshop)** — Hands-on GraphQL training workshop (2018).
- 🎤 **[xoom-graphql-workshop](https://github.com/mstuart/xoom-graphql-workshop)** — Hands-on GraphQL training workshop (2019).

</details>

<details open>
<summary><h2>🤖 AI & Agent Tooling</h2></summary>

- 📟 **[ai-statusline](https://github.com/mstuart/ai-statusline)** — Real-time model, token, cost, and git status line for AI coding assistants.
- 🧠 **[code-memory](https://github.com/mstuart/code-memory)** — Persistent memory for AI coding — semantic search, git history, context that survives.
- ✂️ **[mcp-prune](https://github.com/mstuart/mcp-prune)** — Audit MCP server usage from Claude Code transcripts and prune the idle ones.
- ⏪ **[mcp-replay](https://github.com/mstuart/mcp-replay)** — Record and replay MCP interactions for deterministic CI — nock/msw for MCP.
- 🔍 **[mcp-tool-lint](https://github.com/mstuart/mcp-tool-lint)** — Static linter that catches MCP tool-definition defects before they ship.
- 🍼 **[pr-babysitter](https://github.com/mstuart/pr-babysitter)** — Auto-fixes merge conflicts, failing CI, and review comments with Claude Code.

</details>

<details open>
<summary><h2>🌐 HTTP & API Tooling</h2></summary>

- 🛟 **[fetch-resilience](https://github.com/mstuart/fetch-resilience)** — Retry, timeout, circuit breaker, and bulkhead policies for native fetch — edge-safe, zero deps.
- 🚨 **[openapi-sentinel](https://github.com/mstuart/openapi-sentinel)** — Catch OpenAPI 3.1 spec drift live with runtime request/response validation.
- 📋 **[problem-response](https://github.com/mstuart/problem-response)** — RFC 9457 Problem Details error responses — framework-agnostic and TypeScript-first.
- 🔖 **[versionkit](https://github.com/mstuart/versionkit)** — API versioning with RFC-compliant Sunset and Deprecation headers.
- ⏱️ **[api-perf-budget](https://github.com/mstuart/api-perf-budget)** — Define and enforce per-route latency budgets in CI.

</details>

<details open>
<summary><h2>⚙️ Async & Runtime Primitives</h2></summary>

- 🏁 **[abort-race](https://github.com/mstuart/abort-race)** — Race async operations and auto-cancel the losers' AbortSignals.
- ⏲️ **[abort-timer](https://github.com/mstuart/abort-timer)** — An AbortSignal that fires after a timeout — with reset and clear.
- 🔗 **[signal-compose](https://github.com/mstuart/signal-compose)** — Combine AbortSignals with AND, OR, and timeout semantics.
- 🧵 **[context-local](https://github.com/mstuart/context-local)** — Typed, ergonomic context for async flows over AsyncLocalStorage.
- 🧹 **[disposable-from](https://github.com/mstuart/disposable-from)** — Wrap timers, listeners, and intervals as Disposables with clean teardown.
- ❓ **[has-disposable](https://github.com/mstuart/has-disposable)** — Check whether a value implements Disposable or AsyncDisposable.
- 🧴 **[using-safe](https://github.com/mstuart/using-safe)** — Use and dispose resources safely, even without the `using` declaration.
- 👷 **[offload-fn](https://github.com/mstuart/offload-fn)** — Run a function in a Worker thread and await the result as a promise.
- 🔎 **[is-runtime](https://github.com/mstuart/is-runtime)** — Detect which JavaScript runtime you're executing in.
- 🔐 **[has-permission](https://github.com/mstuart/has-permission)** — Check and assert Node.js Permission Model grants at runtime.

</details>

<details open>
<summary><h2>⚡ Performance, Memory & Caching</h2></summary>

- 📦 **[dep-perf-analyzer](https://github.com/mstuart/dep-perf-analyzer)** — Measure the runtime performance cost of your npm dependencies.
- 📊 **[mem-pressure](https://github.com/mstuart/mem-pressure)** — Watch Node.js memory and emit events when thresholds are crossed.
- 🩺 **[memcheck-node](https://github.com/mstuart/memcheck-node)** — Automated memory-leak regression testing for Node.js.
- 📈 **[perf-fn](https://github.com/mstuart/perf-fn)** — Time sync and async functions with the Performance API.
- 🗑️ **[weakref-store](https://github.com/mstuart/weakref-store)** — A WeakRef cache that evicts entries as values get garbage-collected.
- 🧰 **[portacache](https://github.com/mstuart/portacache)** — Portable key-value cache that auto-picks the best available backend.

</details>

<details open>
<summary><h2>🧱 Data, Collections & Errors</h2></summary>

- 🔁 **[iterable-ops](https://github.com/mstuart/iterable-ops)** — Lazy map, filter, take, chunk, zip, and flatten for sync and async iterables.
- 🗺️ **[map-extras](https://github.com/mstuart/map-extras)** — Missing Map helpers — mapValues, filterEntries, merge, invert, groupBy.
- ➗ **[set-extras](https://github.com/mstuart/set-extras)** — Set algebra — union, intersection, difference, subset, superset.
- 🛂 **[schema-guard](https://github.com/mstuart/schema-guard)** — Build runtime type guards from a plain object schema.
- 🔀 **[deep-diff-patch](https://github.com/mstuart/deep-diff-patch)** — Compute a minimal JSON diff between objects and apply it as a patch.
- 📤 **[error-serialize](https://github.com/mstuart/error-serialize)** — Serialize and rebuild Error objects with their cause chains intact.
- 🏷️ **[error-with-cause](https://github.com/mstuart/error-with-cause)** — Typed error classes with codes, cause chains, and type guards.
- 🌊 **[stream-to-value](https://github.com/mstuart/stream-to-value)** — Drain a Web ReadableStream into a string, bytes, JSON, or array.
- 🚿 **[web-stream-transform](https://github.com/mstuart/web-stream-transform)** — Functional map, filter, take, batch, and tap for Web Streams.

</details>

---

<details>
<summary><h2>📊 Stats</h2></summary>

[![Top languages](https://github-readme-stats.vercel.app/api/top-langs/?username=mstuart&layout=compact&theme=transparent&hide_border=true)](https://github.com/mstuart)

![Contribution graph](https://ghchart.rshah.org/mstuart)

</details>

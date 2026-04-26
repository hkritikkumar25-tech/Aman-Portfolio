# Graph Report - Aman Portfolio  (2026-04-26)

## Corpus Check
- 1 files · ~58,139 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 9 nodes · 10 edges · 2 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]

## God Nodes (most connected - your core abstractions)
1. `parseYoutubeVideoId()` - 2 edges
2. `openVideo()` - 2 edges
3. `inView()` - 2 edges
4. `startCounters()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 1 - "Community 1"
Cohesion: 1.0
Nodes (2): openVideo(), parseYoutubeVideoId()

### Community 2 - "Community 2"
Cohesion: 1.0
Nodes (2): inView(), startCounters()

## Knowledge Gaps
- **Thin community `Community 1`** (2 nodes): `openVideo()`, `parseYoutubeVideoId()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2`** (2 nodes): `inView()`, `startCounters()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Not enough signal to generate questions. This usually means the corpus has no AMBIGUOUS edges, no bridge nodes, no INFERRED relationships, and all communities are tightly cohesive. Add more files or run with --mode deep to extract richer edges._
import { exerciseLibrary } from './src/data/workouts.js';

console.log(`Testing ${exerciseLibrary.length} exercises in parallel...`);

const results = await Promise.all(
  exerciseLibrary.map(async (ex) => {
    try {
      const res = await fetch(ex.imageUrl, { method: 'HEAD' });
      return { id: ex.id, name: ex.name, url: ex.imageUrl, ok: res.ok, status: res.status };
    } catch (e) {
      return { id: ex.id, name: ex.name, url: ex.imageUrl, ok: false, error: e.message };
    }
  })
);

const okList = results.filter((r) => r.ok);
const failList = results.filter((r) => !r.ok);

console.log(`Results: ${okList.length} OK, ${failList.length} Failed.`);
if (failList.length > 0) {
  console.log('Failed exercises:');
  failList.forEach((f) => console.log(`- ${f.id} (${f.name}): status=${f.status || f.error} url=${f.url}`));
}

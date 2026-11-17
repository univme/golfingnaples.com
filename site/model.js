export function matchesCourse(course, { query = '', area = '', setting = '', savedOnly = false, saved = [] } = {}) {
  const terms = query.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim().split(/\s+/).filter(Boolean);
  const text = `${course.name} ${course.area} ${course.access} ${course.setting} ${course.description}`.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  return terms.every(term => text.includes(term)) && (!area || course.area === area) && (!setting || course.setting === setting) && (!savedOnly || saved.includes(course.id));
}
export function readSaved(storage, validIds) {
  try { const value = JSON.parse(storage.getItem('golfing-naples-shortlist') || '[]'); return Array.isArray(value) ? [...new Set(value.filter(id => typeof id === 'string' && validIds.includes(id)))] : []; } catch { return []; }
}

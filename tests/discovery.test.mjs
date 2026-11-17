import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {matchesCourse,readSaved} from '../site/model.js';
const courses=JSON.parse(await readFile(new URL('../site/courses.json',import.meta.url)));
test('area and setting combine to narrow public resort options',()=>{
 assert.deepEqual(courses.filter(c=>matchesCourse(c,{area:'East & South Naples',setting:'Resort'})).map(c=>c.id),['lely-flamingo','lely-mustang']);
});
test('accent-insensitive keyword search finds Tiburón',()=>{
 assert.deepEqual(courses.filter(c=>matchesCourse(c,{query:'tiburon'})).map(c=>c.id),['tiburon']);
});
test('shortlist intersects filters without leaking unrelated results',()=>{
 assert.deepEqual(courses.filter(c=>matchesCourse(c,{savedOnly:true,saved:['arrowhead','eagle-lakes'],area:'North Naples'})).map(c=>c.id),['arrowhead']);
 assert.equal(courses.filter(c=>matchesCourse(c,{savedOnly:true,saved:[]})).length,0);
});
test('corrupt or blocked storage leaves discovery usable',()=>{
 for(const value of ['broken','{}','null','1'])assert.deepEqual(readSaved({getItem:()=>value},['arrowhead']),[]);
 assert.deepEqual(readSaved({getItem:()=>{throw Error('denied')}},['arrowhead']),[]);
 assert.deepEqual(readSaved({getItem:()=> '["arrowhead","arrowhead","unknown",7]'},['arrowhead']),['arrowhead']);
});

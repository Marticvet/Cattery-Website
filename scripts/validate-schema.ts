import { createSchema } from 'sanity';
import { schemaTypes } from '../sanity/schemaTypes';
const schema = createSchema({ name: 'cattery', types: schemaTypes });
const problems = schema._validation?.flatMap((group) => group.problems) || [];
for (const problem of problems) console.log(`${problem.severity}: ${problem.message}`);
if (problems.some((problem) => problem.severity === 'error')) process.exitCode = 1;
else console.log(`Validated ${schemaTypes.length} Sanity schema types with no errors.`);

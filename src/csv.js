import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '';
const supabaseKey = ''
const supabase = createClient(supabaseUrl, supabaseKey);

async function getCSVData() {
  let input = await axios.get("http://localhost:4000").then( res => { return res.data });
  let result = input.reduce((state, current) => {
    let { location, date, variant, num_sequences, perc_sequences, num_sequences_total } = current;
    let country = state[location] || (state[location] = {});
    let caseDate = country[date] || (country[date] = {});
    let variantName = caseDate[variant] || (caseDate[variant] = []);
    variantName.push(current);
    return state;
  }, {});
  return result;
}
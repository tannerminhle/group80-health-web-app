function mean(values){
  return values.reduce((a,b)=>a+b,0) / values.length;
}

function median(values){
  const sorted=[...values].sort((a,b)=>a-b);

  return sorted[Math.floor(sorted.length/2)];
}

function percentile(values,value){
  const sorted=[...values].sort((a,b)=>a-b);
  const below=sorted.filter(v=>v<=value).length;

  return Math.round((below/sorted.length)*100);
}

function computePopulationStats(values,userValue){

  const avg = mean(values);
  const med = median(values);

  return {
    mean: avg,
    median: med,
    percentile: userValue ? percentile(values,userValue) : null,
    diffMean: userValue ? (userValue-avg).toFixed(2) : null,
    diffMedian: userValue ? (userValue-med).toFixed(2) : null
  }
}

module.exports={
  computePopulationStats
}
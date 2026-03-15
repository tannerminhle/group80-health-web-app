function mean(values){
  return values.reduce((a,b)=>a+b,0) / values.length;
}

function median(values){
  const sorted=[...values].sort((a,b)=>a-b);
  const mid=Math.floor(sorted.length/2);

  if(sorted.length % 2 === 0){
    return (sorted[mid-1] + sorted[mid]) / 2;
  }

  return sorted[mid];
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
    percentile: userValue !== null ? percentile(values,userValue) : null,
    diffMean: userValue !== null ? userValue-avg : null,
    diffMedian: userValue !== null ? userValue-med : null
  }
}

module.exports={
  computePopulationStats
}

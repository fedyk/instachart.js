export function extend(data: number[]): [number, number] {
  let min = data[0];
  let max = data[0];

  for (let index = 0; index < data.length; index++) {
    const item = data[index];

    if (!Number.isNaN(item) && data != null) {
      if (min > item) {
        min = item;
      }
      
      if(max < item) {
        max = item
      }
    }    
  }

  return [min, max];
}

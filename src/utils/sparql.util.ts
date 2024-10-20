export function parseValue(data) {
  if (data.type !== 'uri') return data.value;
  return data.value.split('/').pop();
}

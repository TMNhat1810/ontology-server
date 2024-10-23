export function parseValue(data) {
  if (!data || data.type !== 'uri') {
    return data.value;
  }
  return data.value.split('/').pop();
}
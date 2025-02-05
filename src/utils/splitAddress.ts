export function splitAddress(address: string): {
  province: string;
  district: string;
  neighborhood: string;
  detail: string;
} {
  const [province, district, neighborhood, detail] = address.split(/\s+/);
  return { province, district, neighborhood, detail };
}

export interface ProductType {
  id: number;
  name: string;
  qty: number;
  picture: string;
  isActive: boolean;
  expiredAt: string;
  createdAt: string;
  updatedAt: string;
}

export type AddInputProductType = Pick<
  ProductType,
  'name' | 'qty' | 'picture' | 'expiredAt'
>;

export type UpdateInputProductType = Pick<
  ProductType,
  'id' | 'name' | 'qty' | 'picture' | 'expiredAt'
>;

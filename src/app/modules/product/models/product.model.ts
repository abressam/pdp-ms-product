import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'Product',
  timestamps: false,
})
export class Product extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  brand: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.STRING, allowNull: false })
  en_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  pt_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  en_type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  pt_type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  en_desc: string;

  @Column({ type: DataType.STRING, allowNull: false })
  pt_desc: string;
}

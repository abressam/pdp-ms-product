import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'Rating',
  timestamps: false,
})
export class Rating extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  comment: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  grade: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  fk_Customer_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  fk_Product_id: number;
}

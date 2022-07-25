import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRegister } from './create-user.entity';

@Table({
  tableName: 'usersession',
})
export class UserSession extends Model<UserSession> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  usersessionid: string;

  @ForeignKey(() => UserRegister)
  @Column({
    type: DataType.UUID,
  })
  userid: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  jwttoken: string;

  @CreatedAt
  createddate: Date;

  @BelongsTo(() => UserRegister)
  userRegister: UserRegister;
}

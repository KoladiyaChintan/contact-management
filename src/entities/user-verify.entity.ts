import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRegister } from './create-user.entity';

@Table({
  tableName: 'userverify',
})
export class UserVerify extends Model<UserVerify> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => UserRegister)
  @Column({
    type: DataType.STRING,
  })
  userid: string;

  @Column({
    type: DataType.STRING,
  })
  randomtoken: string;

  // @BelongsTo(() => UserRegister)
  // userRegister: UserRegister;
}

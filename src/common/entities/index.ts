import {
  BeforeInsert,
  Column,
  ObjectIdColumn,
  BeforeUpdate,
  ObjectID,
} from 'typeorm';

export abstract class AbstractEntity {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column({ type: 'number' })
  public createAt: number;

  @Column({ type: 'number' })
  public updateAt: number;

  @BeforeInsert()
  insertDates() {
    this.createAt = new Date().getTime();
    this.updateAt = new Date().getTime();
  }

  @BeforeUpdate()
  updateDates() {
    this.updateAt = new Date().getTime();
  }
}

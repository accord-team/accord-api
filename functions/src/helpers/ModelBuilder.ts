import { knex, firebase } from '../db';
import { omit } from 'lodash';
import { DocumentData } from 'firesql/utils';

interface IModelBuilder<T> {
  create(props: T): Promise<DocumentData>
  findAll(): Promise<DocumentData[]>
  find(filters: T, offset: number, limit: number): Promise<DocumentData[]> 
  findOne(filrets:  Partial<T>): Promise<DocumentData>
  findById(id: number): Promise<DocumentData>
  update(id: number, props: T): Promise<boolean>
  destroy(id: number): Promise<boolean>
}

interface BaseModel {
  id: number
  created_at: number
  updated_at: number
}

class ModelBuilder<T extends BaseModel> implements IModelBuilder<T> {
  protected query = knex;
  protected db = firebase;
  protected modelName: string;
  protected tableName;
  protected selectableProps;
  protected timeout;

  constructor ({
    modelName = 'ModelName',
    tableName = 'tablename',
    selectableProps = [],
    timeout = 1000,
  }) {
    this.modelName = modelName;
    this.tableName = tableName;
    this.selectableProps = selectableProps;
    this.timeout = timeout;
  }

  async create(props: Partial<T>): Promise<DocumentData> {
    const propsWithoutId = omit(props, 'id');

    const query = await this.query.insert(propsWithoutId)
      .into(this.tableName)
      .toQuery()
    
    const result = this.db.query(query)

    const createdUser = await this.findById(result[0])
    
    return createdUser; 
  }

  async findAll(): Promise<DocumentData[]> {
    const query = this.query.select(this.selectableProps)
      .from(this.tableName)
      .toQuery()

    const result = await this.db.query(query)

    return result;
  }

  async find(filters: Partial<T>, offset: number = 0, limit: number = 10): Promise<DocumentData[]> {
    const query = await this.query.select(this.selectableProps)
      .from(this.tableName)
      .where(filters)
      .offset(offset)
      .limit(limit)
      .toQuery();

    const result = await this.db.query(query)

    return result;
  }

  async findOne(filters: Partial<T>): Promise<DocumentData> {
   const result = await this.find(filters)
    .then(results => {
      return !Array.isArray(results) ? results : results[0]
    });

    return result;
  }

  async findById(id: number): Promise<DocumentData> {
    const query = await this.query.select(this.selectableProps)
      .from(this.tableName)
      .where({ id })
      .toQuery();

    const result = await this.db.query(query).then(results => {
      return !Array.isArray(results) ? results : results[0]
    });
    
    return result;
  }

  async update(id: number, props: Partial<T>): Promise<boolean> {
    const propsWithoutId = omit(props, 'id');

    const query = await this.query.update(propsWithoutId)
      .from(this.tableName)
      .where({ id })
      .toQuery();
      
    const result = await this.db.query(query)

    return Boolean(result);
  }

  async destroy(id: number): Promise<boolean> {
    const query = await this.query.del()
      .from(this.tableName)
      .where({ id })
      .toQuery();

    const result = await this.db.query(query)
  
    return Boolean(result);
  }
}

export { ModelBuilder };

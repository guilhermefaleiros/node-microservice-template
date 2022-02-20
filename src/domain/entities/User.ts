import { DomainEntity } from '@domain/base/DomainEntity'
import { CPF } from '@domain/vo/CPF'

export class User extends DomainEntity {
  name: string
  cpf: CPF

  constructor(name: string, cpf: string, id = undefined) {
    super(id)
    this.name = name
    this.cpf = new CPF(cpf)
  }
}

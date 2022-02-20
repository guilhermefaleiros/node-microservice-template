import { DomainError } from '@domain/base/DomainError'

export class CPF {
  readonly value

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new DomainError('Ocorreu um erro ao validar o CPF do usuário')
    }
    this.value = value
  }

  private isValid(value: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    return value && regex.test(value)
  }
}

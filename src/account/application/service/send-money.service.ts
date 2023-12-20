import { SendMoneyUseCase, SendMoneyCommand } from '../port/in';
import { LoadAccountPort, AccountLock, UpdateAccountStatePort } from '../port/out';

export class SendMoneyService implements SendMoneyUseCase {
  private loadAccountPort: LoadAccountPort;
  private accountLock: AccountLock;
  private updateAccountStatePort: UpdateAccountStatePort;

  sendMoney(command: SendMoneyCommand): boolean {
    // TODO 비지니스 규칙 검증
    // TODO 모델 상태 조직
    // TODO 출력값 변환
    return true;
  }
}

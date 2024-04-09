import { TradeInfo } from '@/types/general/tradeInfo'
import request from '@/utils/axios.ts'
import { Data } from '@/utils/axios.ts'

export const EnterpriseTradeListAPI = (): Promise<Data<TradeInfo[]>>=>{
  return request({
    url: '/general/trade/list',
    method: 'GET',
  }).then(res=>res.data as Data<TradeInfo[]>)
}
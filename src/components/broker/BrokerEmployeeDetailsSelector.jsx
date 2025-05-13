import { useBroker } from '../../context/BrokerContext';
import BrokerEmployeeDetailsEditable from './BrokerEmployeeDetailsEditable';
import BrokerEmployeeDetailsReadOnly from './BrokerEmployeeDetailsReadOnly';

export default function BrokerEmployeeDetailsSelector(props) {
  const { isReadOnly } = useBroker();
  
  // Use the appropriate component based on read-only status
  return isReadOnly ? (
    <BrokerEmployeeDetailsReadOnly {...props} />
  ) : (
    <BrokerEmployeeDetailsEditable {...props} />
  );
}
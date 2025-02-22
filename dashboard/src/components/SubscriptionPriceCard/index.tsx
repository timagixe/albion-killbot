import { getSubscriptionPriceBanner } from "helpers/subscriptions";
import { getCurrency } from "helpers/utils";
import { Card } from "react-bootstrap";
import { SubscriptionPrice } from "types";

interface SubscriptionPriceCardProps {
  price: SubscriptionPrice;
  children?: JSX.Element | string | number | false;
}

const SubscriptionPriceCard = ({
  price,
  children,
}: SubscriptionPriceCardProps) => {
  return (
    <Card>
      <Card.Img variant="top" src={getSubscriptionPriceBanner(price)} />
      <Card.Body className="pb-0">
        <div className="d-flex justify-content-end align-items-baseline">
          <h4>
            {getCurrency(price.price / 100, {
              currency: price.currency,
            })}
          </h4>
          <div>/</div>
          <div>
            {price.recurrence.count} {price.recurrence.interval}
          </div>
        </div>
      </Card.Body>
      {children && <hr className="mx-2" />}
      {children}
    </Card>
  );
};

export default SubscriptionPriceCard;

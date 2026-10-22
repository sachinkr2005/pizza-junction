export default function Home() {
  return (
    <div className="container-fluid border border-1 p-3 bg-white">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="text-center mb-3">Our Story</h2>
          <p className="small text-muted">
            We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page.
            Fans were given situations where they had to come up with wacky and fun excuses. The person
            with the best excuse won the Best Excuse Badge and won PizzaJunction vouchers. Their enthusiastic
            response proved that PizzaJunction's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!
          </p>
          <p className="small text-muted">
            Ever since we launched the Tastiest Pan Pizza, people have not been able to resist the softest,
            cheesiest, crunchiest, and butteriest Fresh Pan Pizza.
          </p>
        </div>
      </div>

      <div className="row align-items-center mb-4">
        <div className="col-md-5">
          <img
            className="img-fluid rounded shadow-sm"
            src="/assets/ingredients.jpg"
            alt="Pizza ingredients"
          />
        </div>
        <div className="col-md-7 home-copy">
          <h5>Ingredients</h5>
          <p className="small text-muted">
            We are ruthless about goodness. We source fresh, high-quality ingredients and craft every
            pizza with passion and care.
          </p>
        </div>
      </div>

      <div className="row align-items-center mb-4">
        <div className="col-md-7 home-copy order-2 order-md-1">
          <h5>Our Chef</h5>
          <p className="small text-muted">
            They make sauces sing and salads dance. They create culinary magic with seasoned skill,
            deep knowledge, passion, and stirring spoons.
          </p>
        </div>
        <div className="col-md-5 order-1 order-md-2">
          <img
            className="img-fluid rounded shadow-sm"
            src="https://image.shutterstock.com/image-photo/happy-chef-600w-437116033.jpg"
            alt="PizzaJunction Chef"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80";
            }}
          />
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-md-5">
          <img
            className="img-fluid rounded shadow-sm"
            src="https://image.shutterstock.com/image-photo/vintage-analog-kitchen-countdown-timer-260nw-669255388.jpg"
            alt="45 Minute Delivery Guarantee"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80";
            }}
          />
        </div>
        <div className="col-md-7 home-copy">
          <h5>45 min Delivery</h5>
          <p className="small text-muted">
            Hot and fresh pizza delivered right to your doorstep in under 45 minutes, guaranteed.
          </p>
        </div>
      </div>
    </div>
  );
}

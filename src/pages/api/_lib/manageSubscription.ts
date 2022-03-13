import { fauna } from "../../../services/fauna";

import { query as q } from "faunadb";
import { stripe } from "../../../services/stripe";

export async function manageSubscription(
    subscriptionId: string,
    custumerId: string,
    createAction = false,
) {


    console.log(subscriptionId, custumerId);

    const userRef = await fauna.query(
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_custumer_id'),
                    custumerId
                )
            )
        )
    );


    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status_id: subscription.status,
        priceId: subscription.items.data[0].price.id,
    }

    if (createAction) {
        try {
            await fauna.query(
                q.Create(
                    q.Collection('subscriptions'),
                    { data: subscriptionData }
                )
            )
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            await fauna.query(
                q.Replace(
                    q.Select(
                        "ref",
                        q.Get(
                            q.Match(
                                q.Index('subscription_by_id'),
                                subscription.id,
                            )
                        )
                    ),
                    { data: subscriptionData }
                ),
            )
        } catch (error) {
            console.log(error)
        }
    }
}
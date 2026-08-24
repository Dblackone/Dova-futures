# Next Up — preorder-store

1. Run an independent security/QA review in `Dblackone/Dova-preorder` covering checkout, Paystack webhook verification, order transitions, and admin authentication.
2. Decide and configure persistent production storage before accepting live orders.
3. Configure Render secrets and complete an end-to-end Paystack test transaction with principal approval.
4. Address the recorded npm advisory and pnpm allow-scripts warning in the external repository.
5. Seed approved products and images only after the payment and persistence gates pass.

## Someday / backlog

- Expand automated coverage for order-reference generation and webhook replay handling.
- Align the order-confirmation email with the company document system.

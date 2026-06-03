import Link from "next/link";
import { CheckCircle2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="container-page flex flex-col items-center gap-5 py-20 text-center lg:py-28">
      <div className="grid size-20 place-items-center rounded-full bg-secondary">
        <CheckCircle2 className="size-10 text-primary" />
      </div>
      <div>
        <h1 className="font-display text-3xl font-bold lg:text-4xl">
          Yay! Order placed 🎉
        </h1>
        <p className="text-muted-foreground mx-auto mt-2 max-w-md">
          Thank you for shopping with lookkool! We&apos;re packing up your cute
          things with extra care.
        </p>
      </div>

      {order && (
        <div className="bg-card flex items-center gap-3 rounded-2xl border px-5 py-3">
          <Package className="size-5 text-primary" />
          <span className="text-sm">
            Order number:{" "}
            <span className="font-display font-bold">{order}</span>
          </span>
        </div>
      )}

      <p className="text-muted-foreground text-sm">
        A confirmation email is on its way. You can track your order anytime.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/account/orders">View my orders</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/products">Keep shopping</Link>
        </Button>
      </div>
    </div>
  );
}

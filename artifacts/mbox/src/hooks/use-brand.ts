/**
 * Returns brand strings based on the current hostname.
 * - bitaker.io  → "bitaker.io" / "Bitaker"
 * - everything else → "brokerQ.io" / "BrokerQ"
 */
export function useBrand() {
  const isBitaker =
    typeof window !== "undefined" && window.location.hostname.includes("bitaker.io");

  return {
    siteName: isBitaker ? "bitaker.io" : "brokerQ.io",
    logoText: isBitaker ? "bitaker.io" : "BrokerQ",
    email: isBitaker ? "sales@bitaker.io" : "sales@brokerq.io",
    supportEmail: isBitaker ? "support@bitaker.io" : "support@brokerq.io",
    isBitaker,
  };
}

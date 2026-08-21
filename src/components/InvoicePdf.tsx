import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Invoice } from "@/lib/invoices";
import type { Booking } from "@/lib/bookings";
import { formatNaira } from "@/lib/pricing";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, color: "#222753", fontFamily: "Helvetica" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 32 },
  brand: { fontSize: 16, fontWeight: 700, color: "#171b3d" },
  invoiceLabel: { fontSize: 20, fontWeight: 700, textAlign: "right" },
  invoiceNumber: { fontSize: 11, color: "#22275399", textAlign: "right", marginTop: 4 },
  section: { marginBottom: 24 },
  label: { fontSize: 9, color: "#22275366", textTransform: "uppercase", marginBottom: 2 },
  value: { fontSize: 11, marginBottom: 8 },
  table: { borderTop: "1px solid #22275322", paddingTop: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  rowLabel: { color: "#22275399" },
  rowValue: { fontWeight: 700 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid #22275322",
    marginTop: 8,
    paddingTop: 8,
  },
  footer: { marginTop: 40, fontSize: 9, color: "#22275366" },
});

export function InvoicePdf({ invoice, booking }: { invoice: Invoice; booking: Booking }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>ME Consult</Text>
          <View>
            <Text style={styles.invoiceLabel}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>
              #{String(invoice.invoice_number).padStart(6, "0")}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Billed to</Text>
          <Text style={styles.value}>{booking.client_name}</Text>
          <Text style={styles.value}>{booking.client_email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Issued</Text>
          <Text style={styles.value}>{new Date(invoice.issued_at).toLocaleDateString("en-NG")}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{booking.title || booking.service || "Consultation"}</Text>
            <Text style={styles.rowValue}>{formatNaira(booking.fee_kobo)}</Text>
          </View>
          {booking.vat_kobo != null && (
            <View style={styles.row}>
              <Text style={styles.rowLabel}>VAT</Text>
              <Text style={styles.rowValue}>{formatNaira(booking.vat_kobo)}</Text>
            </View>
          )}
          <View style={styles.totalRow}>
            <Text>Total</Text>
            <Text>{formatNaira(invoice.amount_kobo)}</Text>
          </View>
        </View>

        <Text style={styles.footer}>Thank you for choosing ME Consult.</Text>
      </Page>
    </Document>
  );
}

export interface Invoice {
    SrNo: string;
    Type: string;
    No: string;
    OwnerName: string;
    Email: string;
    InvoiceDate: string;
    DueDate: string;
    Paid: string;
    Amount: string;
    LateCharges: string;
    OtherCharges: string;
    Adjustment: string;
    total: number;
    PaymentDate: string;
    PaymentDateObj?: Date | null;
    InvoiceDateObj?: Date | null;
    DueDateObj?: Date | null;
}
package ibrahim.backend.mapper;

import ibrahim.backend.dto.SupplierRequest;
import ibrahim.backend.dto.SupplierResponse;
import ibrahim.backend.entity.Supplier;
import org.springframework.stereotype.Component;

@Component
public class SupplierMapper {

    public Supplier toEntity(SupplierRequest request) {
        Supplier supplier = new Supplier();
        supplier.setName(request.getName());
        supplier.setEmail(request.getEmail());
        supplier.setPhone(request.getPhone());
        supplier.setAddress(request.getAddress());
        return supplier;
    }

    public SupplierResponse toResponse(Supplier supplier) {
        return SupplierResponse.builder()
                .id(supplier.getId())
                .name(supplier.getName())
                .email(supplier.getEmail())
                .phone(supplier.getPhone())
                .address(supplier.getAddress())
                .createdAt(supplier.getCreatedAt())
                .build();
    }

    public void updateEntity(Supplier supplier, SupplierRequest request) {
        supplier.setName(request.getName());
        supplier.setEmail(request.getEmail());
        supplier.setPhone(request.getPhone());
        supplier.setAddress(request.getAddress());
    }
}

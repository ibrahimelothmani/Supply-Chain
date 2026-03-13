package ibrahim.backend.service;

import ibrahim.backend.dto.SupplierRequest;
import ibrahim.backend.dto.SupplierResponse;

import java.util.List;

public interface SupplierService {

    List<SupplierResponse> getAllSuppliers();

    SupplierResponse getSupplierById(Long id);

    SupplierResponse createSupplier(SupplierRequest request);

    SupplierResponse updateSupplier(Long id, SupplierRequest request);

    void deleteSupplier(Long id);

    List<SupplierResponse> searchSuppliers(String name);
}

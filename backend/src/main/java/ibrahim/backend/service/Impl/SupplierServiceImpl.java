package ibrahim.backend.service.Impl;

import ibrahim.backend.dto.SupplierRequest;
import ibrahim.backend.dto.SupplierResponse;
import ibrahim.backend.entity.Supplier;
import ibrahim.backend.exception.DuplicateResourceException;
import ibrahim.backend.exception.ResourceNotFoundException;
import ibrahim.backend.mapper.SupplierMapper;
import ibrahim.backend.repository.SupplierRepository;
import ibrahim.backend.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final SupplierMapper supplierMapper;

    @Override
    public List<SupplierResponse> getAllSuppliers() {
        return supplierRepository.findAll()
                .stream()
                .map(supplierMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public SupplierResponse getSupplierById(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier", id));
        return supplierMapper.toResponse(supplier);
    }

    @Override
    public SupplierResponse createSupplier(SupplierRequest request) {
        if (request.getEmail() != null && supplierRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Supplier with email '" + request.getEmail() + "' already exists");
        }
        Supplier supplier = supplierMapper.toEntity(request);
        Supplier savedSupplier = supplierRepository.save(supplier);
        return supplierMapper.toResponse(savedSupplier);
    }

    @Override
    public SupplierResponse updateSupplier(Long id, SupplierRequest request) {
        Supplier existingSupplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier", id));

        if (request.getEmail() != null && !request.getEmail().equals(existingSupplier.getEmail())
                && supplierRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Supplier with email '" + request.getEmail() + "' already exists");
        }

        supplierMapper.updateEntity(existingSupplier, request);
        Supplier updatedSupplier = supplierRepository.save(existingSupplier);
        return supplierMapper.toResponse(updatedSupplier);
    }

    @Override
    public void deleteSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier", id));
        supplierRepository.delete(supplier);
    }

    @Override
    public List<SupplierResponse> searchSuppliers(String name) {
        return supplierRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(supplierMapper::toResponse)
                .collect(Collectors.toList());
    }
}

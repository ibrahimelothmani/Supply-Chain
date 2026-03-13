package ibrahim.backend.controller;

import ibrahim.backend.dto.StockMovementRequest;
import ibrahim.backend.dto.StockMovementResponse;
import ibrahim.backend.enums.MovementType;
import ibrahim.backend.service.StockMovementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock-movements")
@RequiredArgsConstructor
public class StockMovementController {

    private final StockMovementService stockMovementService;

    @GetMapping
    public ResponseEntity<List<StockMovementResponse>> getAllMovements() {
        return ResponseEntity.ok(stockMovementService.getAllMovements());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockMovementResponse> getMovementById(@PathVariable Long id) {
        return ResponseEntity.ok(stockMovementService.getMovementById(id));
    }

    @PostMapping
    public ResponseEntity<StockMovementResponse> recordMovement(@Valid @RequestBody StockMovementRequest request) {
        StockMovementResponse recorded = stockMovementService.recordMovement(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(recorded);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<StockMovementResponse>> getMovementsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(stockMovementService.getMovementsByProduct(productId));
    }

    @GetMapping("/warehouse/{warehouseId}")
    public ResponseEntity<List<StockMovementResponse>> getMovementsByWarehouse(@PathVariable Long warehouseId) {
        return ResponseEntity.ok(stockMovementService.getMovementsByWarehouse(warehouseId));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<StockMovementResponse>> getMovementsByType(@PathVariable MovementType type) {
        return ResponseEntity.ok(stockMovementService.getMovementsByType(type));
    }
}

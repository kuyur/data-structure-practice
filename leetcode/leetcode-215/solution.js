/**
 * Given an integer array nums and an integer k, return the kth largest element in the array.
 *
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 *
 * Example:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 */

/**
 * @author kuyur@kuyur.info
 */

/**
 * max-heap class.
 * @param {number} capacity
 * @constructor
 */
var Heap = function(capacity) {
  this.array_ = [];
  this.count_ = 0;
  this.capacity_ = capacity || 127;
};

/**
 * @type {Array.<number>}
 */
Heap.prototype.array_;

/**
 * @type {number}
 */
Heap.prototype.count_;

/**
 * @type {number}
 */
Heap.prototype.capacity_;

/**
 * Get parent node index.
 * @param {number} i
 * @return {number}
 */
Heap.prototype.getParentIndex_ = function(i) {
  if (i === 0) {
    return null;
  }
  return Math.floor((i - 1) / 2);
};

/**
 * @private
 */
Heap.prototype.upheapfiy_ = function() {
  if (this.count_ <= 1) {
    return;
  }

  var i = this.count_ - 1;
  var p = this.getParentIndex_(i);
  while (p != null) {
    if (this.array_[p] > this.array_[i]) {
      var m = this.array_[p];
      this.array_[p] = this.array_[i];
      this.array_[i] = m;
      i = p;
      p = this.getParentIndex_(i);
    } else {
      break;
    }
  }
};

/**
 * @private
 */
Heap.prototype.downheapify_ = function() {
  if (this.count_ <= 1) {
    return;
  }
  this.downheapifyImpl_(0);
};

/**
 * @private
 * @param {number} i
 */
Heap.prototype.downheapifyImpl_ = function(i) {
  var left = i * 2 + 1;
  if (left > this.count_ - 1) {
    return;
  }
  var right = i * 2 + 2;
  if (right <= this.count_ - 1) {
    if (this.array_[left] > this.array_[right]) {
      if (this.array_[i] > this.array_[right]) {
        var m = this.array_[i];
        this.array_[i] = this.array_[right];
        this.array_[right] = m;
        this.downheapifyImpl_(right);
      }
    } else {
      if (this.array_[i] > this.array_[left]) {
        var m = this.array_[i];
        this.array_[i] = this.array_[left];
        this.array_[left] = m;
        this.downheapifyImpl_(left);
      }
    }
  } else {
    if (this.array_[i] > this.array_[left]) {
      var m = this.array_[i];
      this.array_[i] = this.array_[left];
      this.array_[left] = m;
    }
  }
}

/**
 * Insert an element into heap, and execute heapify.
 * @param {number} el
 */
Heap.prototype.insert = function(el) {
  if (typeof el !== 'number') {
    return;
  }

  if (this.count_ < this.capacity_) {
    this.array_[this.count_] = el;
    this.count_++;
    this.upheapfiy_();
  } else {
    if (el > this.getTop()) {
      var top = this.array_[0];
      this.array_[0] = el;
      this.downheapify_();
    }
  }
};

/**
 * Get the max element.
 * @param {number} k
 */
Heap.prototype.getTop = function() {
  return this.array_[0];
};

/**
 * Get count of elements.
 * @return {boolean}
 */
Heap.prototype.getCount = function() {
  return this.count_;
};

/**
 * Get capacity of the heap.
 * @return {number}
 */
Heap.prototype.getCapacity = function() {
  return this.capacity_;
};

/**
 * Is heap full.
 * @return {boolean}
 */
Heap.prototype.isFull = function() {
  return this.count_ === this.capacity_;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  var heap1 = new Heap(k);
  for (var i = 0, len = nums.length; i < len; ++i) {
    heap1.insert(nums[i]);
  }
  return heap1.getTop();
};